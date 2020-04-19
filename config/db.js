import * as mysql from "promise-mysql";
const Bluebird = require("bluebird");
const SqlString = require("sqlstring");

const { base64decode } = require("nodejs-base64");

require("dotenv").config();

let dbname;

switch (process.env.NODE_ENV) {
  case "test":
    dbname = "test_db";
    break;
  case "development":
    dbname = "development_db";
    break;
  case "production":
    dbname = "production_db";
    break;
  default:
    dbname = "development_db";
}

const dbAddress = process.env.DB_HOST || "127.0.0.1";
const dbPort = process.env.DB_PORT || 3306;

let connection = mysql.createPool({
  connectionLimit: 100,
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "password",
  database: dbname,
});

export let db = Bluebird.promisifyAll(connection);

export function getConnection() {
  return db.getConnection().disposer((connection) => {
    db.releaseConnection(connection);
  });
}

export let query = (sql, value) => {
  let sqlquery = SqlString.format(sql, value);
  //if (process.env.NODE_ENV === 'test') {
  console.log(sqlquery.green);
  //}
  return new Bluebird((resolve, reject) => {
    Bluebird.using(getConnection(), (connection) => {
      return connection
        .query(sqlquery)
        .then((rows) => {
          // console.log(rows)
          if (Array.isArray(rows)) {
            if (rows.length === 0) {
              resolve([]);
            } else if (rows.length === 1) {
              dataOperations(rows);
              resolve(rows);
            } else {
              dataOperations(rows);
              resolve(rows);
            }
          } else {
            resolve(rows);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error.code);
        });
    });
  });
};

function dataOperations(data) {
  parseUnfoldedJSONInArray(data);
  findAndConvertBufferToStringInArray(data);
  // decodeBase64BufferInArray(data)
}

function findAndConvertBufferToStringInArray(data) {
  data.map((item) => {
    for (var key in item)
      Buffer.isBuffer(item[key])
        ? (item[key] = Buffer.from(item[key]).toString("utf8"))
        : null;
  });
}

function parseUnfoldedJSONInArray(data) {
  data.map((item) => {
    parseUnfoldedJSON(item);
  });

  function parseUnfoldedJSON(item) {
    for (var key in item) {
      try {
        // parse JSON
        item[key] = JSON.parse(item[key]);
      } catch (e) {}
      if (key.includes("unfold")) {
        for (var nestedkey in item[key]) {
          // decode base64
          if (
            item[key][nestedkey].includes("base64:type15:") &&
            !item[key][nestedkey].includes("unfold")
          ) {
            // parse JSON
            item[key][nestedkey] = base64decode(item[key][nestedkey].slice(14));
          }
        }
        // check if parsed json is also contains unfolded keys
        parseUnfoldedJSON(item[key]);
      }
    }
  }
}

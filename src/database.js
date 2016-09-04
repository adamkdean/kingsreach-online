const mysql = require('mysql')

function Database() {}

Database.prototype.initialise = function (config, done) {
  this.config = config
  this.pool = mysql.createPool({
    host: this.config.host,
    port: this.config.port,
    user: this.config.user,
    password: this.config.password,
    database: this.config.database
  })
  done()
}

Database.prototype.query = function (sql, done) {
  this.pool.getConnection((err, connection) => {
    if (err) done(err, null)
    else connection.query(sql, (err, rows, fields) => {
      if (err) done(err, null)
      else done(null, rows)
    })
  })
}

Database.prototype.getBannedCharacters = function (done) {
  const sql = `
  SELECT CONCAT(\`character\`.\`Name\`, ' ', \`character\`.\`LastName\`) AS \`PlayerName\`
  FROM \`character\`
  INNER JOIN \`account\` ON \`account\`.\`ID\`=\`character\`.\`AccountID\`
  WHERE \`account\`.\`IsActive\`=0
  `
  this.query(sql, done)
}

Database.prototype.getKills = function (done) {
  const sql = `
  SELECT
    CONCAT(\`Victim\`.\`Name\`, ' ', \`Victim\`.\`LastName\`) AS \`VictimName\`
    , CONCAT(\`Killer\`.\`Name\`, ' ', \`Killer\`.\`LastName\`) AS \`KillerName\`
    , FROM_UNIXTIME(\`chars_deathlog\`.\`Time\`, '%a %D %b %Y') AS \`KillDate\`
    , FROM_UNIXTIME(\`chars_deathlog\`.\`Time\`, '%T') AS \`KillTime\`
  FROM \`chars_deathlog\`
  LEFT JOIN \`character\` AS \`Victim\`
    ON \`Victim\`.\`ID\`=\`chars_deathlog\`.\`CharID\`
  INNER JOIN \`character\` AS \`Killer\`
    ON \`Killer\`.\`ID\`=\`chars_deathlog\`.\`KillerID\`
  WHERE
    \`chars_deathlog\`.\`IsKnockout\`=0
    AND \`chars_deathlog\`.\`CharID\` <> \`chars_deathlog\`.\`KillerID\`
  ORDER BY \`chars_deathlog\`.\`Time\` DESC
  `
  this.query(sql, done)
}

module.exports = exports = new Database()

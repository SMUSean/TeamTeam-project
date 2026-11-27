module.exports = {
  apps : [{
    name   : "vite",
    script : "npm vite"
  },{
    name   : "server.cjs",
    script : "node --env-file='.env' server.cjs"
  }
]
}

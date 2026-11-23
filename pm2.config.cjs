module.exports = {
  apps : [{
    name   : "vite",
    script : "npm --env-file='.env' vite"
  },{
    name   : "server.cjs",
    script : "node server.cjs"
  }
]
}

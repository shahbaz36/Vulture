const { spawn } = require('child_process');

exports.scriptRunner = (req, res) => {

  target= req.body.target;

  var largeDataSet = [];
  // spawn new child process to call the python script
  const python = spawn('python', ['script.py',`${target}` ]);
  // collect data from script
  python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      largeDataSet.push(data);
  });
  // in close event we are sure that stream is from child process is closed
  python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      // send data to browser
      res.send(largeDataSet.join(""))
  });
}
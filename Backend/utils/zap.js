const ZapClient = require('zaproxy');
const catchAsync = require('./catchAsync');

const apiKey = 'uh9v6fpv2kng2aiq9tjk1dt9tq';
const target = 'https://kaif-imteyaz.github.io/MLH-4.0/';

const zapOptions = {
  apiKey: apiKey,
  proxy: {
    host: '127.0.0.1',
    port: 8080,
  }
};
const zaproxy = new ZapClient(zapOptions);

exports.runZAPScan =catchAsync( async (req,res)=> {

    // Wait until the passive scan has finished
    while (parseInt(await zaproxy.pscan.recordsToScan()) > 0) {
      console.log('Records to passive scan: ' + (await zaproxy.pscan.recordsToScan()));
      await new Promise(resolve => setTimeout(resolve, 2000)); // Sleep for 2 seconds
    }

    console.log('Passive Scan completed');

    // Print Passive scan results/alerts
    const hostsData = await zaproxy.core.hosts();
    const hosts = Object.keys(hostsData).map(key => hostsData[key].host);
    console.log('Hosts: ' + hosts.join(', '));

    const alerts = await zaproxy.core.alerts(target);

    if(alerts === null){
      return res.status(200).json({
        status : 'success',
        alerts : 'No alerts found'
      });
    }

    res.status(200).json({
      status : 'success',
      alerts : alerts
    });

});
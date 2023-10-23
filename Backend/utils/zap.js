const ZapClient = require('zaproxy');

const apiKey = 'dgahc0lcvtgrbvp49i3gccq2sl';
const target = 'https://kaif-imteyaz.github.io/MLH-4.0/';

const zapOptions = {
  apiKey: apiKey,
  proxy: {
    host: '127.0.0.1',
    port: 8080,
  }
};
const zaproxy = new ZapClient(zapOptions);

exports.runZAPScan = async (req,res)=> {
  try {
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
    console.log('Alerts:');
    res.json(alerts);
  } catch (error) {
    console.error('Error occurred: ' + error.message);
  }
}




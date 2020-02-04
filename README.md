# homebridge-stagg-ekg-plus

A [Homebridge](https://github.com/nfarina/homebridge) plugin for [Stagg EKG+](https://fellowproducts.com/collections/heat/products/stagg-ekg-plus).

## Requirements

* Currently only Linux is supported
* `gatttool` needs to be installed

## Installation

Install the npm package:

```bash
sudo npm install -g homebridge-stagg-ekg-plus
```

Find your Stagg Kettle's MAC address (BLE MAC) with the official iOS/Android app, and add an accessory definition to `~/.homebridge/config.json`:

```json
{
    "accessories": [
        {
            "accessory": "Stagg EKG",
            "name": "Wall Switch",
            "macAddress": "01:23:45:67:89:AB"
        }
    ]
}
```

## Resources
Special thank you to [@tlyakhov](https://github.com/tlyakhov/) for all the help!

He has a more robust project found here.
https://github.com/tlyakhov/fellow-stagg-ekg-plus

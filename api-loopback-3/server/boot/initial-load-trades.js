// Copyright IBM Corp. 2015,2019. All Rights Reserved.
// Node module: generator-loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = function(app, cb) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * https://loopback.io/doc/en/lb3/Working-with-LoopBack-objects.html
   * for more info.
   */

  let trades = [
    {product: 'EUR/USD', orderType: 'buy', openingPrice: 1100, openingDateTime: new Date(), closingDateTime: new Date(), closingPrice: 1200, currency: 'eur', size: 10, profitLoss: 1000},
    {product: 'EUR/GBP', orderType: 'sell', openingPrice: 5100, openingDateTime: new Date(), currency: 'eur', size: 5},
    {product: 'EUR/JPY', orderType: 'buy', openingPrice: 4300, openingDateTime: new Date(), currency: 'eur', size: 4},
    {product: 'USD/EUR', orderType: 'sell', openingPrice: 2100, openingDateTime: new Date(), currency: 'eur', size: 100},
    {product: 'USD/GBP', orderType: 'sell', openingPrice: 7100, openingDateTime: new Date(), currency: 'eur', size: 50},
    {product: 'USD/JPY', orderType: 'buy', openingPrice: 9000, openingDateTime: new Date(), currency: 'eur', size: 8},
  ];

  for (let trade of trades) {
    app.models.Trade.findOrCreate({where: {product: trade.product, orderType: trade.orderType, openingPrice: trade.openingPrice, currency: trade.currency, size: trade.size}}, trade, function(err, instance, created) {
      if (err) throw err;
      console.log(instance);
      console.log("Created: " + created);
    });
  }

  process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};

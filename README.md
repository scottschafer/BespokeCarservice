Built with 
[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

A simple ecommerce webapp built in AngularJs by Scott Schafer.

Overview of architecture: 

The OfferingsService singleton maintains the offerings returned from the server
(which in this case is mocked up). You can update its offerings by passing in a
new date range. Conceptually, this may not make a request if the date range has
already been retrieved. TODO: look into $cacheFactory.

*/public/modules/core/services/offerings.client.service.js*

The BookingsViewController is the controller for the parent view. This controller
maintains the model for the cart and date filter, and interacts with cookies to persist
the cart and date range.
*/public/modules/core/controllers/bookings-view.client.controller.js*

The BookingsView has three tabs, each displaying a different type of offering (gas,
wash, air freshener). These tabs use nested states, so they all share the scope of the
BookingsViewController. To display different types of data and to handle the date range
filtering, the 'ofilter' is used.
*/public/modules/core/filters/offering.client.filter.js*
*/public/modules/core/views/bookings-view.client.view.html*

Finally, this project has two custom directives, one for the cart and one for each offering
(aka booking). These bind directly to the data in the BookingsViewController.
*/public/modules/core/directives/cart.client.directive.js*
*/public/modules/core/directives/booking.client.directive.js*

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

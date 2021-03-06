//    copyright 2016 Open Interconnect Consortium, Inc. All rights reserved.
//
//    Redistribution and use in source and binary forms, with or without modification,
//    are permitted provided that the following conditions are met:
//    1.  Redistributions of source code must retain the above copyright notice,
//        this list of conditions and the following disclaimer.
//    2.  Redistributions in binary form must reproduce the above copyright notice,
//        this list of conditions and the following disclaimer in the documentation and/or other materials provided
//        with the distribution.
//         
//    THIS SOFTWARE IS PROVIDED BY THE OPEN INTERCONNECT CONSORTIUM, INC. "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
//    INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE OR
//    WARRANTIES OF NON-INFRINGEMENT, ARE DISCLAIMED. IN NO EVENT SHALL THE OPEN INTERCONNECT CONSORTIUM, INC. OR
//    CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
//    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
//    OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
//    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//    EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Generated code from swagger2x
// generates an IOTivity node server based on
// https://github.com/otcshare/iotivity-node
// documentation available at:
// https://github.com/01org/iot-js-api/tree/master/api/ocf

var intervalId;
var iotivity = require( "iotivity-node/lowlevel" );

// instances for each end point  
// path /BinarySwitchResURI
var  _BinarySwitchResURI;
// list all variables as globals
var _BLAH1; // readonly: True type: boolean description: BLAH1 description
var _value; // readonly:  type: boolean description: description value
var _BLAHF2; // readonly: False type: number description: Status of the switch
var _BLAH2; // readonly: True type: boolean description: BLAH2 description
var _BLAH3; // readonly: True type: boolean description: BLAH3 description
var _BLAHF1; // readonly: False type: string description: Status of the switch
var _BLAHF3; // readonly: False type: integer description: Status of the switch
var _value2; // readonly:  type: boolean description: description value2
console.log( "Starting OCF stack in server mode" );

// Start iotivity and set up the processing loop
iotivity.OCInit( null, 0, iotivity.OCMode.OC_SERVER );

// set the device data
iotivity.OCSetDeviceInfo( {
	specVersion: "res.1.1.0",
	dataModelVersions: [ "abc.0.0.1" ],
	deviceName: "oic.d.light",
	types: []
} );
// set the platform data
iotivity.OCSetPlatformInfo( {
	platformID: "9b8fadc6-1e57-4651-bab2-e268f89f3ea7",
	manufacturerName: "ocf.org"
} );
// helper function
intervalId = setInterval( function() {
	iotivity.OCProcess();
}, 1000 );

console.log( "Registering resources" );
// Create a new resource for /BinarySwitchResURI
iotivity.OCCreateResource(
	// The bindings fill in this object
	_BinarySwitchResURI,
	"oic.r.switch.binary",
    ['oic.if.a'],
    "/BinarySwitchResURI",
	function( flag, request ) {
		console.log( "Entity handler called with flag = " + flag + " and the following request:" );
		console.log( JSON.stringify( request, null, 4 ) );

        // GET method
		if ( request && request.method === iotivity.OCMethod.OC_REST_GET ) {

			iotivity.OCDoResponse( {
				requestHandle: request.requestHandle,
				resourceHandle: request.resource,
				ehResult: iotivity.OCEntityHandlerResult.OC_EH_OK,
				payload: {
					type: iotivity.OCPayloadType.PAYLOAD_TYPE_REPRESENTATION,
					values: {
                        "rt" : _rt,
                        "id" : _id,
                        "value" : _value
                        }
				},
				resourceUri: "/BinarySwitchResURI",
				sendVendorSpecificHeaderOptions: []
			} );
            return iotivity.OCEntityHandlerResult.OC_EH_OK; 
        }            
        // POST method
		if ( request && request.method === iotivity.OCMethod.OC_REST_POST ) {
            
            if ( request && request.payload)
            {
              // update the global variables
              "_value" = request.payload.value;
              "_id" = request.payload.id;
              }
            // do something with the new values like printing them..
            console.log( "new value (value) : " + value );
            console.log( "new value (id) : " + id );
            iotivity.OCDoResponse( {
				requestHandle: request.requestHandle,
				resourceHandle: request.resource,
				ehResult: iotivity.OCEntityHandlerResult.OC_EH_OK,
				payload: {
					type: iotivity.OCPayloadType.PAYLOAD_TYPE_REPRESENTATION,
					values: {
						"value" : _value,
                        "id" : _id
                        }
				},
				resourceUri: "/BinarySwitchResURI",
				sendVendorSpecificHeaderOptions: []
			} );
            return iotivity.OCEntityHandlerResult.OC_EH_OK;
        }
        // By default we error out
		return iotivity.OCEntityHandlerResult.OC_EH_ERROR;
	},
    // always discoverable
	iotivity.OCResourceProperty.OC_DISCOVERABLE );

console.log( "Server ready" );

// Exit gracefully when interrupted
process.on( "SIGINT", function() {
    console.log( "SIGINT: Quitting..." );

    // Tear down the processing loop and stop iotivity
    clearInterval( intervalId );
    // deleting all handles
    iotivity.OCDeleteResource( _BinarySwitchResURI.handle );
    // stop the stack
    iotivity.OCStop();
    // Exit
    process.exit( 0 );
} );
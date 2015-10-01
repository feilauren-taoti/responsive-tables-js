/*!
 * @author Steven Masala [me@smasala.com]
 * Github: https://github.com/smasala/responsive-tables-js
 * @license MIT https://tldrlegal.com/license/mit-license
 * Responsive Tables
 * @version 0.1.4
 *
 * usage: give any table you want to work responsively, the CSS class "responsive".
 */

( function( root, factory ) {
    "use strict";
    
    if ( typeof define === "function" && define.amd ) {
        define( [ "jquery" ], function( $ ) {
            return factory( root, root.document, $ );
        } );
    } else {
        return factory( root, root.document, root.jQuery );
    }

} )( this, function( window, document, $ ) {
    "use strict";
    
    if ( window.responsiveTables ) {
        console.error( "window.responsiveTables is already defined globally", window.responsiveTables );
        return;
    }

    var responsiveTables = {

        version: "0.1.4",

        titleTpl: function( data ) {
            return "<span data-type='responsive'>" + data + "</span>";
        },

        /**
         * @method update
         * @param id {String} optional - pass if you wish to update a specific table
         */
        update: function( id ) {
            var me = this,
                id1 = typeof id === "string" ? "#" + id : "",
                tables = $( "table" + id1 + ".responsive" ),
                table, ths, th, trs, tds, td, text; //for later

            if ( tables.length > 0 ) {

                for ( var i = 0, l = tables.length; i < l; i++ ) {
                    //iterate over each table
                    table = $( tables[ i ] );
                    //get all the table header for the give table
                    ths = $( table ).find( "th" );
                    trs = $( table ).find( "tr" );
                    //iterate over all trs
                    for ( var ii = 0, ll = trs.length; ii < ll; ii++ ) {
                        //find tds and iterate
                        tds = $( trs[ ii ] ).find( "td" );
                        for ( var iii = 0, lll = tds.length; iii < lll; iii++ ) {
                            //for each td - find the correct heading
                            th = ths[ iii ];
                            //get the text content
                            text = th.textContent || text.innerText || "";
                            //prepend td with the correct template
                            td = $( tds[ iii ] ).prepend( me.titleTpl( text ) );
                        }
                    }
                }
            }
        }

    };
    
    //define globally
    window.responsiveTables = responsiveTables;
    //init
    $( document ).ready( function() {
        window.responsiveTables.update();
    } );
    return responsiveTables;
} );

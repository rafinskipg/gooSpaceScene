define([

], function(

){
    "use strict";
    var computeSize = {};
    computeSize.compute = function (sun_size){
        var form = {};
        var a = sun_size;
        var scale_factor ;
        var b = 0;


        //  scale factor entered in inches
        if ( a != 0 && b == 0 ) {
            scale_factor = a / 1391900;
            form.sun_size_mm = this.int_zero( a * 25.4 * 10 ) / 10;
        }

        //  scale factor entered in millimeters
        if ( b != 0 && a == 0 ) {
            scale_factor = (b / 25.4) / 1391900;
            form.sun = this.int_zero( ( b / 25.4 ) * 10 ) / 10;
        }

        form.merc_size = this.int_zero(scale_factor * 4866 * 10000 ) / 10000;
        form.merc_size_mm = this.int_zero(scale_factor * 4866 * 25.4 * 10 ) / 10;
        form.merc_dist_feet = this.int_zero(scale_factor * 57950000 / 12 );
        form.merc_dist_inch = this.int_zero((scale_factor * 57950000) % 12 * 100) /100;
        form.merc_dist_meter = this.int_zero(scale_factor * 57950000 * .0254 *1000  ) / 1000;

        form.venus_size = this.int_zero(scale_factor * 12106 * 10000 ) / 10000;
        form.venus_size_mm = this.int_zero(scale_factor * 12106 * 25.4 * 10 ) / 10;
        form.venus_dist_feet = this.int_zero(scale_factor * 108110000 / 12 ,10 );
        form.venus_dist_inch = this.int_zero((scale_factor * 108110000) % 12 * 100) /100;
        form.venus_dist_meter = this.int_zero(scale_factor * 108110000 * .0254 *1000 ) / 1000;

        form.earth_size = this.int_zero(scale_factor * 12742 * 10000 ) / 10000;
        form.earth_size_mm = this.int_zero(scale_factor * 12742 * 25.4 * 10 ) / 10;
        form.earth_dist_feet = this.int_zero(scale_factor * 149570000 / 12 );
        form.earth_dist_inch = this.int_zero((scale_factor * 149570000) % 12 * 100) /100;
        form.earth_dist_meter = this.int_zero(scale_factor * 149570000 * .0254 *1000 ) / 1000;

        form.mars_size = this.int_zero(scale_factor * 6760 * 10000 ) / 10000;
        form.mars_size_mm = this.int_zero(scale_factor * 6760 * 25.4 * 10 ) / 10;
        form.mars_dist_feet = this.int_zero(scale_factor * 227840000 / 12 );
        form.mars_dist_inch = this.int_zero((scale_factor * 227840000) % 12 * 100) /100;
        form.mars_dist_meter = this.int_zero(scale_factor * 227840000 * .0254 *1000 ) / 1000;

        form.jupiter_size = this.int_zero(scale_factor * 142984 * 10000 ) / 10000;
        form.jupiter_size_mm = this.int_zero(scale_factor * 142984 * 25.4 * 10 ) / 10;
        form.jupiter_dist_feet = this.int_zero(scale_factor * 778140000 / 12 );
        form.jupiter_dist_inch = this.int_zero((scale_factor * 778140000) % 12 * 100) /100;
        form.jupiter_dist_meter = this.int_zero(scale_factor * 778140000 * .0254 * 1000 ) / 1000;

        form.saturn_size = this.int_zero(scale_factor * 116438 * 10000 ) / 10000;
        form.saturn_size_mm = this.int_zero(scale_factor * 116438 * 25.4 * 10 ) / 10;
        form.saturn_dist_feet = this.int_zero(scale_factor * 1427000000 / 12 );
        form.saturn_dist_inch = this.int_zero((scale_factor * 1427000000 ) % 12 * 100) /100;
        form.saturn_dist_meter = this.int_zero(scale_factor * 1427000000 * .0254 * 1000 ) / 1000;

        form.uranus_size = this.int_zero(scale_factor * 46940 * 10000 ) / 10000;
        form.uranus_size_mm = this.int_zero(scale_factor * 46940 * 25.4 * 10 ) / 10;
        form.uranus_dist_feet = this.int_zero(scale_factor * 2870300000 / 12 );
        form.uranus_dist_inch = this.int_zero((scale_factor * 2870300000 ) % 12 * 100) /100;
        form.uranus_dist_meter = this.int_zero(scale_factor * 2870300000 * .0254 * 1000 ) / 1000;

        form.neptune_size = this.int_zero(scale_factor * 45432 * 10000 ) / 10000;
        form.neptune_size_mm = this.int_zero(scale_factor * 45432 * 25.4 * 10 ) / 10;
        form.neptune_dist_feet = this.int_zero(scale_factor * 4499900000 / 12 );
        form.neptune_dist_inch = this.int_zero((scale_factor * 4499900000 ) % 12 * 100) /100;
        form.neptune_dist_meter = this.int_zero(scale_factor * 4499900000 * .0254 * 1000 ) / 1000;

        form.pluto_size = this.int_zero(scale_factor * 2274 * 1000 ) / 1000;
        form.pluto_size_mm = this.int_zero(scale_factor * 2274 * 25.4 * 10 ) / 10;
        form.pluto_dist_feet = this.int_zero(scale_factor * 5913000000 / 12 );
        form.pluto_dist_inch = this.int_zero((scale_factor * 5913000000) % 12 * 100) /100;
        form.pluto_dist_meter = this.int_zero(scale_factor * 5913000000 * .0254 * 1000 ) / 1000;

        
        return form;
    }
    // Function to return 0 if result is <1
    computeSize.int_zero = function (x)
    {
        if ( x < 1 )
            return 0 ;
        else
            return parseInt( x ,10 );
    }

    return computeSize;
});

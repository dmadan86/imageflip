(function (document, window, undefined, $) {
    var div = $("<div/>")[0];
        prefixes = ['-webkit-', '-moz', '-o', '-ms'];

    $.fn.imageFlip = function (options) {
        return this.each(function () {
            if (!$.data(this, "imageFlip")) {
                $.data(this, "imageFlip", new imageFlip($(this), options)) ;
            }
        })
    };
    $.fn.imageFlip.version = "0.1";
    $.fn.imageFlip.defaults = {
        canvas: true,
        horizontalFlip: true,
        verticalFlip: true
    };

    function imageFlip(container, options ){
        if(!container.is("img")) return;                            //A general check whether the object is an Image

        var config = $.extend($.fn.imageFlip.defaults ,options );    //Override the existing settings
        var canvas = $("<canvas/>"),
            ctx = canvas.get(0).getContext("2d");

        var flipH = config.horizontalFlip,
            flipV = config.verticalFlip,
            scaleH = flipH ? -1 : 1,                            // Set horizontal scale to -1 if flip horizontal
            scaleV = flipV ? -1 : 1,                            // Set verical scale to -1 if flip vertical
            posX, posY;

        //Wait for the image to get Loaded
        if(config.canvas && support.canvasSupport){
            container[0].onload = function(){
                renderCanvas();
            };

        }else{
            container.css(support.transform, "scale(" + scaleH + "," + scaleV + ")");
        }

        var renderCanvas = function (){
            console.log(flipH)
            container.hide().wrap("<div style='position:relative' />");
            var obj = {
                width: container.width(),
                height: container.height()
            };

            canvas.attr(obj).css(obj).appendTo(container.parent());
            posX = flipH ? container.width() * -1 : 0;      // Set x position to -100% if flip horizontal
            posY = flipV ? container.height() * -1 : 0;     // Set y position to -100% if flip vertical
            ctx.save();                                     // Save the current state
            ctx.scale(scaleH, scaleV);                      // Set scale to flip the image
            ctx.drawImage(container.get(0), posX, posY);    // draw the image
            ctx.restore();                                  // Restore the last saved state
        };

        this.setFlip = function(horizontalFlip, verticalFlip){
            loaded(horizontalFlip, verticalFlip, true)
        };
    }

    var getVendorPropertyName = function(prop){
        var prop_ = prop.charAt(0) + prop.substr(1);
        for (var i = 0; i < prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in div.style)  return vendorProp;
        }
        if (prop in div.style) return prop;
    },

    support = {};
    support.transform = getVendorPropertyName('transform');
    support.canvasSupport = !!window.HTMLCanvasElement;
})(document, window, undefined, jQuery);
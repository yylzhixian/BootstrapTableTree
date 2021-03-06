;
(function ($) {
    //默认参数
    var defaluts = {
        "titles": [],
        "data": [],
        "headerSetting": {
            "background-color": "#99CCCC",
            "font-size": "16px",
            "color": "#ffffff"
        },
        "cellSetting": {
            "color": "#4b5f72",
            "font-size": "16px"
        },
        "oddRowBgColor": "#f7fafa",
        "evenRowBgColor": "#ffffff",
        "expanded": function (node) {},
        "collapsed": function (node) {}
    };
    $.fn.tableTree = function (options) {
        var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数

        if (opts.titles.length < 1 || opts.titles.length < 1)
            return this;

        return this.each(function () {
            init(opts, $(this));
        });
    }

    function init(opts, container) {
        createTableHeader(opts.titles, opts.data, container);
        createTableBody(opts.data, 1, 'table-tree-tr-', container);
        $('.table-tree-th-td', container).css('width', (100 / (titles.length + 1)) + '%');
        $('.table-tree-th', container).css('background-color', opts.headerSetting["background-color"]).css('font-size', opts.headerSetting["font-size"]).css('color', opts.headerSetting.color);
        $('.table-tree-tr-td', container).css('font-size', opts.cellSetting["font-size"]).css('color', opts.cellSetting.color).css('width', (100 / (titles.length + 1)) + '%');
        shiftBgColor(opts.oddRowBgColor, opts.evenRowBgColor, container);

        container.on('click', '.table-tree-tr-icon>span.glyphicon-minus-sign', function () {
            var cls = $(this).data('class');
            var node = $(this).parent().parent().parent().data('node');
            $('.table-tree-tr', container).each(function () {
                if ($(this).attr('class').indexOf(cls) > 0 && !$(this).hasClass(cls)) {
                    $('.table-tree-tr-icon>span.glyphicon-minus-sign', this).attr('class', 'glyphicon glyphicon-plus-sign');
                    $(this).slideUp('fast');
                }
            });
            $(this).attr('class', 'glyphicon glyphicon-plus-sign');
            setTimeout(function () {
                shiftBgColor(opts.oddRowBgColor, opts.evenRowBgColor, container);
            }, 500);
            opts.collapsed(node);
        });
        container.on('click', '.table-tree-tr-icon>span.glyphicon-plus-sign', function () {
            var cls = $(this).data('class');
            var node = $(this).parent().parent().parent().data('node');
            $('.table-tree-tr', container).each(function () {
                var thisClass = $(this).attr('class');
                if (thisClass.indexOf(cls) > 0 && !$(this).hasClass(cls)) {
                    var str = thisClass.split(cls)[1];
                    if (str.split('-').length == 2) {
                        $(this).slideDown('fast');
                    }
                }
            });
            $(this).attr('class', 'glyphicon glyphicon-minus-sign');
            setTimeout(function () {
                shiftBgColor(opts.oddRowBgColor, opts.evenRowBgColor, container);
            }, 500);
            opts.expanded(node);
        });
    }

    function createTableHeader(titles, datalist, container) {
        var row = $('<div class="row table-tree-th"></div>');
        var td = $('<div class="table-tree-th-td"></div>');
        row.append(td);
        for (var i = 0; i < titles.length; i++) {
            td = $('<div class="table-tree-th-td">' + titles[i] + '</div>');
            row.append(td);
        }
        container.append(row);
    }

    function createTableBody(datalist, depth, upClass, container) {
        for (var i = 0; i < datalist.length; i++) {
            var row = $('<div class="row table-tree-tr"></div>');
            var cls = upClass + (i + 1) + '-';
            row.addClass(cls);
            row.attr('data-node', JSON.stringify(datalist[i]));
            var td1 = $('<div class="table-tree-tr-td"></div>');
            for (var j = 1; j < depth; j++) {
                td1.append($('<div class="table-tree-tr-td-span"></div>'));
            }
            var link = $('<a href="javascript:void(0);" class="table-tree-tr-icon"></a>');
            link.append($('<span class="glyphicon glyphicon-plus-sign" aria-hidden="true" data-class="' + cls + '"></span>'));
            if (datalist[i].children && datalist[i].children.length > 0) {
                link.css('visibility', 'visible');
            } else {
                link.css('visibility', 'hidden');
            }
            td1.append(link);
            if (i + 1 == datalist.length) {
                td1.append($('<div class="table-tree-tr-td-signicon-last"></div>'));
            } else {
                td1.append($('<div class="table-tree-tr-td-signicon"></div>'));
            }
            row.append(td1);
            for (var k = 0; k < datalist[i].data.length; k++) {
                var td2 = $('<div class="table-tree-tr-td">' + datalist[i].data[k] + '</div>');
                row.append(td2);
            }
            if (depth != 1)
                row.hide();
            container.append(row);
            if (datalist[i].children && datalist[i].children.length > 0)
                createTableBody(datalist[i].children, depth + 1, cls, container);
        }
    }

    function shiftBgColor(odd, even, container) {
        $('div.row.table-tree-tr:visible', container).each(function (i) {
            if (i % 2 == 0) {
                $(this).css('background-color', even);
            } else {
                $(this).css('background-color', odd);
            }
        });
    }
})(window.jQuery);

# BootstrapTableTree
This is a lightweight jQeury plugin with Bootstrap style that can be used to create a table tree that can be expanded and collapsed.

# Example
[Bootstrap Table Tree](https://github.com/yylzhixian/BootstrapTableTree/tree/master/example)

# Usage instructions
##1. include style sheets
Please include the bootstrap.min.css,and make sure the bootstrap.min.css behide it.
```javascript
<!-- Put these into the <head> -->
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="src/bootstrap.tableTree.css">
```
##2. include jQuery and tableTree
To use tableTree, you’ll need to make sure both the tableTree and jQuery scripts are included. If you’ve already got jQuery (you can test by opening your JavaScript console and typing !!window.jQuery — if it says true, you have jQuery), you don’t need to add the first line.
```javascript
<script src="jquery-latest.min.js"></script>
<script src="src/bootstrap.tableTree.js"></script>
```
##3. HTML
Before create a table tree,it just needs a container to load the table.
```javascript
<div id="table"></div>
```
##4. Plug it all together
We’ve been through so much together, and I’m pleased to say the finish line is near. Our journey is almost over, just one more thing left to do. The JavaScript is on the right (make sure to put it in a script tag, and change #table to whatever your table’s element is).
```javascript
$(function() {
    $('#table').tableTree({
        data: dataList,  //json formatted table data
        titles: titles,  //header data
    });
});
```
# Parameters
Although it’s lightweight, table-tree comes with a range of options to customise your table. Here’s the default options provided. You can add, remove, or completely skip out the options object. It’s up to you.
```javascript
$(function() {
    $('#table').tableTree({
        data: dataList,            //json formatted table data
        titles: titles,            //header text
        headerSetting: {           //Header style settings
            background-color: "#99CCCC",//Background color of the header
            font-size: "16px",     //The text size of the header
            color: "#ffffff"       //The text color of the header
        },
        cellSetting: {             //Cell style settings
            color: "#4b5f72",      //The text color of the Cell
            font-size: "16px"      //The text size of the Cell
        },
        oddRowBgColor: "#f7fafa",  //Odd line of background color
        evenRowBgColor: "#ffffff", //Even line of background color
        expanded: function(node) { //A callback function when a row is expanded
            console.log('expanded');
            console.log(node);
        },
        collapsed: function(node) {//A callback function when a row is folded
            console.log('collapsed');
            console.log(node);
        }
    });
});
```
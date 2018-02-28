import add from "./add.js";
import "../style/index.styl";

let num = add(9, 10);
console.log(num);
$.ajax({
	url: "/api/test",
	success: function(response) {
		console.log(response);
	}
});

Template.home.rendered = function(){
	var game = new Chess()/*,
	  statusEl = $('#status'),
	  fenEl = $('#fen'),
	  pgnEl = $('#pgn')*/;

	// do not pick up pieces if the game is over
	// only pick up pieces for the side to move
	var onDragStart = function(source, piece, position, orientation) {
	  if (game.game_over() === true ||
	      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
	      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
	    return false;
	  }
	};

	var onDrop = function(source, target) {
	  // see if the move is legal
	  var move = game.move({
	    from: source,
	    to: target,
	    promotion: 'q' // NOTE: always promote to a queen for example simplicity
	  });

	  // illegal move
	  if (move === null) return 'snapback';
	  updateStatus();
	};

	// update the board position after the piece snap 
	// for castling, en passant, pawn promotion
	var onSnapEnd = function() {
	  board.position(game.fen());
	};

	var updateStatus = function() {
	  var status = '';

	  var moveColor = 'White';
	  if (game.turn() === 'b') {
	    moveColor = 'Black';
	  }

	  // checkmate?
	  if (game.in_checkmate() === true) {
	    status = 'Game over, ' + moveColor + ' is in checkmate.';
	  }

	  // draw?
	  else if (game.in_draw() === true) {
	    status = 'Game over, drawn position';
	  }

	  // game still on
	  else {
	    status = moveColor + ' to move';

	    // check?
	    if (game.in_check() === true) {
	      status += ', ' + moveColor + ' is in check';
	    }
	  }

	  // statusEl.html(status);
	  // fenEl.html(game.fen());
	  // pgnEl.html(game.pgn());
	};

	var cfg = {
	  draggable: true,
	  position: 'start',
	  onDragStart: onDragStart,
	  onDrop: onDrop,
	  onSnapEnd: onSnapEnd
	};
	myboard = new ChessBoard('board', cfg);
	updateStatus();
};


Template.home.events({
	'click #btn1':function(event){
		alert("click");
		myboard.move('e2-e4');
	},
	'submit #homeform': function(event){
		event.preventDefault();
		var cmd = event.target.inputcommand.value;
		//parse goes there
		//create dict
		var alpha = ['a','b','c','d','e','f','g','h']
		var num = ['1', '2' , '3' , '4', '5' , '6' , '7' , '8'];
		var result=[],idx=0,dict="";
		for(var i = 0;i<alpha.length;i++)
		{
			for(var j = 0;j<num.length;j++)
			{
				result[idx++]=alpha[i]+num[j];
			}
		}
		//split/trim
		cmd = cmd.trim();
		cmd = cmd.toLowerCase();
		if(cmd.indexOf("to")>-1)
		{
			var string1 = cmd.substring(0,cmd.indexOf("to"));
			var string2 = cmd.substring(cmd.indexOf("to")+2);
			for(var i=0;i<result.length;i++)
			{
				if(string1.indexOf(result[i])>-1)
				{
					dict+=result[i];
					dict+="-";
					break;
				}
			}
			if(dict.indexOf("-")<=-1)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
			var indicator=false;
			for(var i=0;i<result.length;i++)
			{
				if(string2.indexOf(result[i])>-1)
				{
					dict+=result[i];
					indicator = true;
					break;
				}
			}
			if(!indicator)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
		}
		else if(cmd.indexOf("takes")>-1)
		{
			var string1 = cmd.substring(0,cmd.indexOf("takes"));
			var string2 = cmd.substring(cmd.indexOf("takes")+2);
			for(var i=0;i<result.length;i++)
			{
				if(string1.indexOf(result[i])>-1)
				{
					dict+=result[i];
					dict+="-";
					break;
				}
			}
			if(dict.indexOf("-")<=-1)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
			var indicator=false;
			for(var i=0;i<result.length;i++)
			{
				if(string2.indexOf(result[i])>-1)
				{
					dict+=result[i];
					indicator = true;
					break;
				}
			}
			if(!indicator)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
		}
		else if(cmd.indexOf("take")>-1)
		{
			var string1 = cmd.substring(0,cmd.indexOf("take"));
			var string2 = cmd.substring(cmd.indexOf("take")+4);
			for(var i=0;i<result.length;i++)
			{
				if(string1.indexOf(result[i])>-1)
				{
					dict+=result[i];
					dict+="-";
					break;
				}
			}
			if(dict.indexOf("-")<=-1)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
			var indicator=false;
			for(var i=0;i<result.length;i++)
			{
				if(string2.indexOf(result[i])>-1)
				{
					dict+=result[i];
					indicator = true;
					break;
				}
			}
			if(!indicator)
			{
				alert("Failed");
				console.log("Failure. dict="+dict);
			}
		}
		console.log("Dict is now ->  :"+dict);
		//test if legal

		//move it
		//alert(cmd);
	}
});
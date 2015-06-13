Template.home.rendered = function(){
	var board,
	  game = new Chess()/*,
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
	  }else{
          console.log("game is over");   
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
	board = new ChessBoard('board', cfg);

	updateStatus();
    var board2 = new ChessBoard('board2');

$('#setStartBtn').on('click', board2.start);

$('#setRuyLopezBtn').on('click', function() {
  board2.position('r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R');
});

$('#setRookCheckmateBtn').on('click', function() {
  board2.position({
    a4: 'bK',
    c4: 'wK',
    a7: 'wR'
  });
});
    

//$('.ui.form').form({
//        movement: {
//      identifier : 'username',
//      rules: [
//        {
//          type   : 'empty',
//          prompt : 'Please enter a step'
//        }
  //    ]
   // },
//    });

}

Template.formSteps.events({
	'submit #editform': function(event){
		event.preventDefault();
		var movement = event.target.Steps.value;
		Steps.insert({
			uid:Meteor.userId(),
			movement:movement
		});
        console.log(Steps);
	}
});
Template.allSteps.helpers({
	Steps: function(){
		return Steps.find({uid:Meteor.userId()});
	}
});


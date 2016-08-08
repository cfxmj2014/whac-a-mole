var hasHole = {},
    score,
    nowScore = 0,
    _countDown = 30,
    _speed = 1000,
    _stay_speed = 1000,
    gametimeTimer, gamerandomTimer;

var gameRandom = function() {
  var holeRandom = Math.floor(Math.random() * 9 + 1),
      random = Math.floor(Math.random() * 225);

  while (hasHole[holeRandom]) {
    holeRandom = Math.floor(Math.random() * 9 + 1);
  }
  hasHole[holeRandom] = "true";

  var $li = $('li:nth-child(' + holeRandom + ')');

  if (random >= 0 && random <= 19) {
    score = 1;
  } else if (random >= 20 && random <= 49) {
    score = 2;
  } else if (random >= 50 && random <= 89) {
    score = 5;
  } else if (random >= 90 && random <= 139) {
    score = 10;
  } else if (random >= 140 && random <= 179) {
    score = 50;
  } else if (random >= 180 && random <= 209) {
    score = 100;
  } else if (random >= 210 && random <= 216) {
    score = 500;
  } else if (random >= 217 && random <= 219) {
    score = 1000;
  } else if (random >= 220 && random <= 224) {
    score = 0;
  }

  if (score == 0) {
    $li.append("<div style='background: url(/src/images/game-boom.png) 0 0 no-repeat;background-size: 100% 100%;' data-index=" + score + "></div>");
    $li.find('i').html("+" + score);
  } else {
    $li.append("<div data-index=" + score + "><span>" + score + "</span></div>");
    $li.find('i').html("+" + score);
  }

  var $div = $li.find('div');

  gameBeat($div);
  gameAnimate($div, holeRandom);

  gamerandomTimer = setTimeout(function() {
    gameRandom();
  }, _speed);
}

var gameAnimate = function($div, holeRandom) {
  var $this = $(this),
  $i = $this.siblings('i');

  $div.animate({
    top: parseInt($div.css('top')) - 10,
    opacity: 1
  }, _stay_speed / 2, function() {
    $div.animate({
      top: parseInt($div.css('top')) + 10,
      opacity: 0
    }, _stay_speed / 2, function() {
      $i.html('');
      $div.remove();
      hasHole[holeRandom] = null;
    });
  });
}

var gameBeat = function($div) {
  $div.delegate('', 'touchend', function() {
    var $this = $(this),
    current_index = parseInt($this.attr("data-index")),
    $i = $this.siblings('i');

    if (current_index == 0) {
      $('ul').append('<div class="game-booming"></div>');
      $this.remove();
      gameOver();

      return;
    } else {
      changeScore(current_index);
      $('.game-score').attr('data-score', nowScore);
      $i.css('opacity', '1');
      $i.animate({
        "opacity": 0,
        "top": parseInt($i.css('top')) - 10
      },
      500,
      function() {
        $i.css('top', parseInt($i.css('top')) + 10);
        $i.html('');
      });
      $this.remove();
    }
  })
}

var changeScore = function(score) {
  nowScore += score;
  $('.game-score').html(nowScore);
}

var gameTime = function() {
  $('.countDown').html(_countDown);

  if (_countDown == 0) {
    gameOver();
    return;
  } else {
    _countDown = _countDown - 1;

    if (_countDown >= 25 && _countDown < 30) {
      _speed = 750;
    } else if (_countDown >= 20 && _countDown < 25) {
      _speed = 650;
    } else if (_countDown >= 15 && _countDown < 20) {
      _speed = 550;
    } else if (_countDown >= 10 && _countDown < 15) {
      _speed = 450;
    } else if (_countDown >= 5 && _countDown < 10) {
      _speed = 350;
    } else if (_countDown > 0 && _countDown < 5) {
      _speed = 250;
    }

    gametimeTimer = setTimeout(gameTime, 1000);
  }
}

// var gameAjax = function(total) {
//   alert('总得分',total)
// }

var gameOver = function() {
  clearTimeout(gametimeTimer);
  clearTimeout(gamerandomTimer);

  setTimeout(function() {
    $('.game-mask').removeClass('none');
    $('.game-countdown').removeClass('visibility-hidden').addClass('game-over');
  }, 1500);

  // setTimeout(function() {
  //   gameAjax(parseInt($('.game-score').html()));
  // }, 2500);
}

var init = function() {
  gameTime();
  gameRandom();
}

window.onload = function() {
  var i = 4,
  gamestartTimer2;

  $("body").on("touchmove", false);

  gamestartTimer2 = setInterval(function() {
    if (i == 0) {
      clearTimeout(gamestartTimer2);

      $('.game-countdown').addClass('visibility-hidden').removeClass('game-countdown-' + (i + 1));
      $('.game-mask').addClass('none');

      init();
    } else {
      $('.game-countdown').addClass('game-countdown-' + i).removeClass('game-countdown-' + (i + 1));
      i--;
    }
  }, 1000);
}

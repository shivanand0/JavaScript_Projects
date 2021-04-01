function playSound (e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log(audio); //if data-key is not in audio then in console we will get null
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //we'are animations so for that we selected keys
    if (!audio) // handle null keys
      return;
    audio.currentTime = 0; // allow fast play
    audio.play();
    key.classList.add('playing'); //added class playing using js
  }

  function endSound (e) {
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!key)
      return;
    key.classList.remove('playing');
  }

  window.addEventListener('keydown', playSound)//event listner for keydown event and call function playSound which plays the sound
  window.addEventListener('keyup', endSound)//event listner for keyup event and call function endSound which stops playing sound
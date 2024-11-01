const song1 = document.getElementById('song-1');
const song2 = document.getElementById('song-2');
const audio1 = document.getElementById('audio-1');
const audio2 = document.getElementById('audio-2');

const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const progressBar = document.querySelector('.progress-bar');

let currentSong = audio1;

// Formata o tempo para mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Atualiza a duração total quando o áudio carrega
function updateDuration() {
    totalTimeEl.textContent = formatTime(currentSong.duration);
}

currentSong.addEventListener('loadedmetadata', updateDuration);

// Atualiza o tempo atual e a barra de progresso enquanto o áudio toca
function updateTime() {
    currentTimeEl.textContent = formatTime(currentSong.currentTime);
    const progress = (currentSong.currentTime / currentSong.duration) * 100;
    progressBar.style.width = `${progress}%`;
}

currentSong.addEventListener('timeupdate', updateTime);

// Função para alternar entre play e pause
function playAudio() {
    currentSong.play();
    updateButtonStates(true);
}

function pauseAudio() {
    currentSong.pause();
    updateButtonStates(false);
}

// Atualiza os botões para refletir o estado atual (reproduzindo/pausado)
function updateButtonStates(isPlaying) {
    const playBtns = document.querySelectorAll('.play-btn');
    const pauseBtns = document.querySelectorAll('.pause-btn');

    playBtns.forEach(btn => btn.classList.remove('play-selected'));
    pauseBtns.forEach(btn => btn.classList.add('pause-selected'));

    if (isPlaying) {
        playBtns.forEach(btn => btn.classList.add('play-selected'));
        pauseBtns.forEach(btn => btn.classList.remove('pause-selected'));
    }
}

// Função para alternar para a song1
function switchToSong1() {
    if (currentSong !== audio1) {
        currentSong.pause();
        currentSong.currentTime = 0;

        currentSong = audio1;
        song2.classList.add('hide');
        song1.classList.remove('hide');
        currentSong.addEventListener('loadedmetadata', updateDuration);
        currentSong.addEventListener('timeupdate', updateTime);

        playAudio(); // Inicia a nova música automaticamente
    }
}

// Função para alternar para a song2
function switchToSong2() {
    if (currentSong !== audio2) {
        currentSong.pause();
        currentSong.currentTime = 0;

        currentSong = audio2;
        song1.classList.add('hide');
        song2.classList.remove('hide');
        currentSong.addEventListener('loadedmetadata', updateDuration);
        currentSong.addEventListener('timeupdate', updateTime);

        playAudio(); // Inicia a nova música automaticamente
    }
}

// Inicializa os eventos para os botões
document.getElementById('play-btn-1').addEventListener('click', playAudio);
document.getElementById('pause-btn-1').addEventListener('click', pauseAudio);
document.getElementById('next-btn-1').addEventListener('click', switchToSong2);
document.getElementById('back-btn-1').addEventListener('click', switchToSong1);

document.getElementById('play-btn-2').addEventListener('click', playAudio);
document.getElementById('pause-btn-2').addEventListener('click', pauseAudio);
document.getElementById('next-btn-2').addEventListener('click', switchToSong2); // O botão Next para a song2
document.getElementById('back-btn-2').addEventListener('click', switchToSong1); // O botão Back leva à song1
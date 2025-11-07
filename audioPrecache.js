const AUDIO_PATHS = [
    // File BGM yang disebutkan
    'BGM.wav', 
    // File taunt dari AnimationsTexts di loadJson.json
    'CH0325_MemorialLobby_1_1.wav',
    'CH0325_MemorialLobby_1_2.wav',
    'CH0325_MemorialLobby_2_1.wav',
    'CH0325_MemorialLobby_2_2.wav',
    'CH0325_MemorialLobby_3_1.wav',
    'CH0325_MemorialLobby_3_2.wav',
    'CH0325_MemorialLobby_3_3.wav',
    'CH0325_MemorialLobby_4_1.wav',
    'CH0325_MemorialLobby_4_2.wav',
    'CH0325_MemorialLobby_4_3.wav',
    'CH0325_MemorialLobby_5_1.wav',
    'CH0325_MemorialLobby_5_2.wav',
    // Note: semua nama file audio taunt diatas berasal dari loadJson.json
];

/**
 * Fungsi untuk melakukan pre-caching file audio.
 * Dengan membuat elemen Audio dan memanggil load(), kita memaksa browser 
 * untuk mengunduh file audio di latar belakang.
 */
function precacheAudioFiles() {
    // Memulai proses di latar belakang
    console.log("Memulai pre-caching file audio...");
    let cachedCount = 0;
    
    AUDIO_PATHS.forEach(path => {
        const audio = new Audio();
        
        // Memastikan browser mencoba mengunduh seluruh file audio.
        audio.preload = 'auto'; 
        audio.src = path;
        
        audio.oncanplaythrough = () => {
            cachedCount++;
            if (cachedCount === AUDIO_PATHS.length) {
                console.log("Semua file audio selesai di-pre-cache.");
            }
        };

        audio.onerror = () => {
            console.warn(`[Precache Audio] Gagal memuat audio: ${path}`);
            cachedCount++; // Tetap hitung meskipun gagal
        };

        // Memulai proses pengunduhan.
        // File audio tidak akan diputar, hanya akan dimuat ke cache browser.
        audio.load();
    });
}

// Jalankan fungsi precache setelah DOM siap.
window.addEventListener('load', precacheAudioFiles);
let stage = 'prod';

const host = stage === 'dev' ? 'http://localhost:5000' : 'https://sellofantasma.click' 

const localStorageSession = localStorage.getItem('sessionId');

if(!localStorageSession) {
    window.location.replace(host);
}

async function getSession() {
    const response = await axios.get(`${host}/checkout/session/${localStorageSession}`);

    if(response.data.success) {
        console.log("clearing local Storage");
        localStorage.clear();
    } else {
        window.location.replace(host);
    }
}

getSession();
    console.log("Testing");

    async function loadWorld() {
        const res = await fetch("/world");
        const data =  await res.json();
    }
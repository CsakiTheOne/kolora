<script>
    import DriveVideo from "../../../components/DriveVideo.svelte";
    import Footer from "../../../components/Footer.svelte";
    import Header from "../../../components/Header.svelte";
</script>

<Header />
<main>
    <h2>2024 évnyitó slam</h2>
    <p>
        A Nyolcas Műhely adott otthont a Kolora Egyesület 2024-es évnyitó slam
        versenyének, ahol 18 előadást láthattunk. Köztük volt 6 tehetséges
        versenyző és sok új ember, akik először álltak a színpadra. Köszönjük a
        helyet a Nyolcas Műhelynek és a támogatást minden fellépőnek és nézőnek!
    </p>
    <h3>Open-mic fellépők</h3>
    <div class="video-row">
        <div>
            <p>Csáktornyai Ádám (Csáki)</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1bVeTZuD6QHeDQajUbn8_1xYZ0C044sfn"
            />
        </div>
        <div>
            <p>Esti Bálint Kornél</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1qsqnAiZEI1ngU2Ayu8ubIYv4MSsGOfJY"
            />
        </div>
        <div>
            <p>Kalafatics Imre</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1_ERjLbHq_93ipdvBExluOcnj6LQVYzoi"
            />
        </div>
        <div>
            <p>Kanizsay Dénes</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1THvvGBeIADoc_bB5wigVEvvm-RpA6rts"
            />
        </div>
        <div>
            <p>Kis Bálint (Kis Piros)</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1LSwSFxx9D6f5Z5axicygn0mLS0TiJXR2"
            />
        </div>
        <div>
            <p>Lelkes Máté</p>
            <DriveVideo
                src="https://drive.google.com/file/d/10HGPGjzjWXDvmZy62DmXJbNHyU7bctVF"
            />
        </div>
        <div>
            <p>Mészáros Emese</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1u4FUt1mXF3ABqkPrRd1BIwsIBrJuf0yD"
            />
        </div>
        <div>
            <p>Sárközi Bence (Pam-Pam)</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1yh2HDc9v1ad6rZY51j7sXjcNnCY6ZXqD"
            />
        </div>
        <div>
            <p>Szvoren Eszter</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1vsrlkKoyKqNoo3P-uBokk5W8AM6Kfddj"
            />
        </div>
        <div>
            <p>Tóth Zsombor</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1sfQVSUcfYcph9S9KBRKb0rIm35fUTEwE"
            />
        </div>
    </div>
    <h3>Versenyzők</h3>
    <div class="video-row">
        <div>
            <p>Esti Bálint Kornél</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1rTjJm6jjbEva6rsh30DcEyoM_q4t6Qre"
            />
        </div>
        <div>
            <p>Paulinusz Anna (Panka)</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1uk0x0OF-DaUrPnHiSBI6ADFwV9joK21E"
            />
        </div>
        <div>
            <p>Pomaházi Tamás</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1c21cvtC1ZxxWW-IVmSrw_Om8zYEo0mTu"
            />
        </div>
        <div>
            <p>Sárközi Bence (Pam-Pam)</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1OURlqx-TbzyjCWSAUu68Y2ker4HV03rj"
            />
        </div>
        <div>
            <p>Tóth Zsombor</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1mxgTeItq-J2gmLSk_0Y8fIAa4-GQty9D"
            />
        </div>
        <div>
            <p>Zádori Bence</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1zH9YQqvJ1MMm0v_DLNVsgONKYNHWc1J_"
            />
        </div>
    </div>
    <h3>A ráadás</h3>
    <div class="video-row">
        <div>
            <p>Tóth Zsombor</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1l2r5gHCSLBF1p7h2fdUSDG0a4jixUnQd"
            />
        </div>
        <div>
            <p>Völgyesi Toma</p>
            <DriveVideo
                src="https://drive.google.com/file/d/1rW7cauWXZAi3fWyLKm5yCyxz2-mced9r"
            />
        </div>
    </div>
</main>
<Footer />

<style>
    .video-row {
        grid-column: full;
        display: flex;
        background-color: var(--secondary-color);
        color: #fff;
        padding: var(--spacing);
        gap: var(--spacing);
        overflow-x: auto;
    }

    @media (min-width: 720px) {
        .video-row {
            padding: var(--spacing) 20%;
        }
    }
</style>

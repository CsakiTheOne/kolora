<script lang="ts">
    import { initializeFirebase } from "$lib/firebase/firebase";
    import firestore from "$lib/firebase/firestore";
    import KoloraUser, { ROLES } from "$lib/model/KoloraUser";
    import { onAuthStateChanged } from "firebase/auth";
    import firebase from "firebase/compat/app";
    import { onMount } from "svelte";
    import SmallHeader from "../../components/SmallHeader.svelte";
    import Footer from "../../components/Footer.svelte";

    let koloraUser = $state(new KoloraUser());

    onMount(() => {
        const auth = initializeFirebase().auth;
        let userListener: (() => void) | null = null;
        const authListener = auth.onAuthStateChanged((user) => {
            if (user) {
                userListener = firestore.users.listen(user.uid, (newKoloraUser) => {
                    koloraUser = newKoloraUser;
                    if (!koloraUser.roles.includes(ROLES.ADMIN) || !koloraUser.roles.includes(ROLES.KOLORA_MEMBER)) {
                        window.history.back();
                    }
                });
            } else {
                koloraUser = new KoloraUser();
                if (userListener) {
                    userListener();
                    userListener = null;
                }
            }
        });

        return () => {
            authListener();
        };
    });
</script>

<SmallHeader currentPage="Dashboard" />
<main>
    
</main>
<Footer />
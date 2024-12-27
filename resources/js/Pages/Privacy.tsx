import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Privacy({}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
}>) {
    return (
        <>
            <Head title="Politika privatnosti" />
            <header>
                <h1>Politika privatnosti</h1>
            </header>

            <section>
                <h2>VD-AD obrt za usluge dostave</h2>
                <p>
                    <strong>Vlasnik:</strong> Joško Dželalija
                </p>
                <p>
                    <strong>Sjedište:</strong> Vodice, Ulica Josipa
                    Šprljana-Akabe 8
                </p>
            </section>

            <section>
                <h2>1. Podaci koje prikupljamo</h2>
                <h3>1.1. Podaci koje pružate</h3>
                <ul>
                    <li>Ime i prezime</li>
                    <li>Adresa dostave</li>
                    <li>Broj telefona</li>
                    <li>Email adresa</li>
                    <li>Podaci o narudžbi</li>
                </ul>

                <h3>1.2. Automatski prikupljeni podaci</h3>
                <ul>
                    <li>IP adresa</li>
                    <li>
                        Informacije o uređaju (npr. vrsta uređaja, operativni
                        sustav)
                    </li>
                    <li>Podaci o lokaciji (uz vašu suglasnost)</li>
                    <li>Povijest narudžbi</li>
                </ul>
            </section>

            <section>
                <h2>2. Kako koristimo vaše podatke</h2>
                <p>Prikupljene podatke koristimo u sljedeće svrhe:</p>
                <ul>
                    <li>Obrada i dostava narudžbi.</li>
                    <li>
                        Komunikacija s korisnicima (npr. potvrde narudžbi,
                        obavijesti).
                    </li>
                    <li>Poboljšanje funkcionalnosti aplikacije.</li>
                    <li>Usklađivanje s pravnim obvezama.</li>
                </ul>
            </section>

            <section>
                <h2>3. Dijeljenje podataka</h2>
                <p>
                    Vaši podaci neće biti dijeljeni trećim stranama, osim u
                    sljedećim situacijama:
                </p>
                <ul>
                    <li>
                        Ako je potrebno za izvršenje usluge (npr. dostavljači).
                    </li>
                    <li>Kada to zahtijeva zakon ili nadležna tijela.</li>
                </ul>
            </section>

            <section>
                <h2>4. Sigurnost podataka</h2>
                <p>
                    Poduzimamo tehničke i organizacijske mjere kako bismo
                    zaštitili vaše podatke od neovlaštenog pristupa, izmjena ili
                    gubitka. Međutim, imajte na umu da nijedna metoda prijenosa
                    podataka putem interneta nije 100% sigurna.
                </p>
            </section>

            <section>
                <h2>5. Vaša prava</h2>
                <p>Kao korisnik imate pravo na:</p>
                <ul>
                    <li>Pristup svojim podacima.</li>
                    <li>Ispravak netočnih podataka.</li>
                    <li>Brisanje podataka ("pravo na zaborav").</li>
                    <li>Ograničenje obrade podataka.</li>
                    <li>Prijenos podataka.</li>
                    <li>
                        Podnošenje prigovora nadležnom tijelu za zaštitu
                        podataka.
                    </li>
                </ul>
                <p>
                    Za ostvarenje vaših prava, obratite nam se putem emaila:{" "}
                    <a href="mailto:vd-ad@example.com">vd-ad@example.com</a>.
                </p>
            </section>

            <section>
                <h2>6. Kolačići i praćenje</h2>
                <p>
                    Aplikacija može koristiti kolačiće i slične tehnologije za
                    praćenje aktivnosti korisnika radi poboljšanja korisničkog
                    iskustva. Kolačići se koriste uz vašu suglasnost, a možete
                    ih onemogućiti putem postavki uređaja.
                </p>
            </section>

            <section>
                <h2>7. Promjene politike privatnosti</h2>
                <p>
                    Zadržavamo pravo izmjene ove politike privatnosti. Sve
                    promjene bit će objavljene unutar aplikacije, a ažurirana
                    verzija stupit će na snagu odmah nakon objave.
                </p>
            </section>

            <section>
                <h2>8. Kontakt</h2>
                <p>
                    Za sva pitanja ili zahtjeve vezane uz privatnost podataka
                    možete nas kontaktirati na:
                </p>
                <ul>
                    <li>
                        <strong>VD-AD obrt za usluge dostave</strong>
                    </li>
                    <li>
                        <strong>Joško Dželalija</strong>
                    </li>
                    <li>
                        <strong>Adresa:</strong> Vodice, Ulica Josipa
                        Šprljana-Akabe 8
                    </li>
                    <li>
                        <strong>Email:</strong>{" "}
                        <a href="vodiceapsolutnadostava@gmail.com">
                            vodiceapsolutnadostava@gmail.com
                        </a>
                    </li>
                    <li>
                        <strong>Telefon:</strong> +385 95 328 1111
                    </li>
                </ul>
            </section>

            <footer>
                <p>Hvala vam na povjerenju!</p>
            </footer>
        </>
    );
}

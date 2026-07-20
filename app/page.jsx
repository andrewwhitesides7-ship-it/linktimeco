import Reveal from "./components/Reveal";
import BuyButton from "./components/BuyButton";
import StickyBar from "./components/StickyBar";
import { BUILD_TIME_WEEKS, CONTACT_EMAIL, PRICE } from "../lib/config";

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12.5 10 17.5 19 7"
      stroke="#c8102e"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const marqueeItems = [
  "One of one dial",
  "NH34 jeweled automatic",
  "Hand-built to order",
  "Free US shipping",
  "Send us your hole-in-one ball",
  "Lifetime guarantee",
];

export default function Home() {
  return (
    <>
      <div className="announce">
        Made to order &bull; about 2 weeks to your wrist &bull; free US shipping
      </div>

      <nav className="nav">
        <a className="nav-mark" href="#top">
          Links Time Co<span>.</span>
        </a>
        <a className="nav-cta" href="#buy">
          Order &bull; ${PRICE}
        </a>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero wrap">
          <div>
            <span className="eyebrow">Hand-built &bull; One at a time</span>
            <h1>
              A real golf ball,
              <br />
              <em>reborn as a dial.</em>
            </h1>
            <p className="hero-sub">
              The Dimple Dial is cut by hand from a genuine tour golf ball and
              set in polished stainless steel over a jeweled automatic
              movement. Use ours, or send us your own ball and wear the
              story behind it.
            </p>
            <div className="price-row">
              <span className="price">${PRICE}</span>
              <span className="price-note">Yours is built when you order</span>
            </div>
            <BuyButton />
            <div className="trust-row">
              <span>
                <Check /> Free US shipping
              </span>
              <span>
                <Check /> Lifetime guarantee
              </span>
              <span>
                <Check /> Secure checkout
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <span className="hero-badge">Handcrafted</span>
            <img 
              src="/images/box.jpg" 
              alt="Links Time Co. premium watch box packaging containing the custom Dimple Dial watch" 
            />
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i}>
                {item} <em>&bull;</em>
              </span>
            ))}
          </div>
        </div>

        {/* STORY */}
        <section className="section">
          <div className="wrap split">
            <Reveal>
              <span className="eyebrow">The dial</span>
              <h2>Cut from the ball. Set in steel.</h2>
              <p className="lede">
                Every dial starts as a real golf ball. We slice it, true it,
                and seat it under the crystal, dimples intact, the red numeral
                riding just below center, the red second hand sweeping over it
                like a tee peg in flight.
              </p>
              <p className="lede" style={{ marginTop: "16px" }}>
                From across the room it reads as a clean silver watch. Up
                close, every golfer does a double take.
              </p>
            </Reveal>
            <Reveal className="d1">
              <img
                src="/images/detail-1.png"
                alt="Close-up of the golf ball dial showing the dimple texture"
              />
            </Reveal>
          </div>
        </section>

        {/* CUSTOM BALL */}
        <section className="section tight">
          <div className="wrap-narrow center">
            <Reveal>
              <span className="eyebrow center">Custom builds</span>
              <h2>Your ball. Your story. Your watch.</h2>
              <p className="lede">
                The ball from your first hole-in-one. The one you sank to win
                the club championship. Your dad&apos;s ball, your trip ball,
                your lucky ball. Send it to us and we&apos;ll build it into
                your Dimple Dial, so the shot lives on your wrist instead of
                in a drawer.
              </p>
              <p className="lede" style={{ marginTop: "16px" }}>
                Shipping is on us. After you order, we email you a prepaid
                label, you drop the ball in the mail, and the build starts
                the day it lands on the bench. Same price, same lifetime
                guarantee.
              </p>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section tight">
          <div className="wrap center">
            <Reveal>
              <span className="eyebrow center">Why it earns the wrist</span>
              <h2>Built like a watch. Born on a course.</h2>
            </Reveal>
            <div className="features">
              <Reveal className="feature d1">
                <div className="dot" />
                <h3>One of one</h3>
                <p>
                  The dimple pattern on your dial exists on exactly one ball
                  in the world. Yours.
                </p>
              </Reveal>
              <Reveal className="feature d2">
                <div className="dot" />
                <h3>Jeweled automatic</h3>
                <p>
                  The NH34 automatic winds itself off your wrist. Sweeping
                  seconds, no battery, ever.
                </p>
              </Reveal>
              <Reveal className="feature d3">
                <div className="dot" />
                <h3>Full stainless</h3>
                <p>
                  Polished stainless case and oyster-style bracelet, sized to
                  fit most wrists.
                </p>
              </Reveal>
              <Reveal className="feature d3">
                <div className="dot" />
                <h3>Hand-built</h3>
                <p>
                  Assembled one at a time over {BUILD_TIME_WEEKS} weeks. We
                  send a photo of your watch before it ships.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section">
          <div className="wrap center">
            <Reveal>
              <span className="eyebrow center">In the metal</span>
              <h2>Every angle earns a look.</h2>
            </Reveal>
            <div className="gallery">
              <Reveal className="d1">
                <figure>
                  <img
                    src="/images/detail-2.jpg"
                    alt="Three-quarter studio view of the polished stainless steel case"
                  />
                </figure>
              </Reveal>
              <Reveal className="d2">
                <figure>
                  <img
                    src="/images/detail-3.jpg"
                    alt="Caseback view showing the NH34 automatic movement"
                  />
                </figure>
              </Reveal>
              <Reveal className="d3">
                <figure>
                  <img
                    src="/images/box.jpg"
                    alt="The custom Dimple Dial presentation box setup"
                  />
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section tight">
          <div className="wrap">
            <Reveal>
              <span className="eyebrow">How it works</span>
              <h2>Ordered today. On the bench tomorrow.</h2>
              <p className="lede">
                We don&apos;t sell from a warehouse shelf. Your order starts a
                build. That&apos;s why no two Dimple Dials are alike, and why
                yours is worth a short wait.
              </p>
            </Reveal>
            <div className="steps">
              <Reveal className="step d1">
                <span className="tee">01 &mdash; Tee shot</span>
                <h3>You order</h3>
                <p>
                  Checkout takes a minute. You get a confirmation with your
                  build date the same day.
                </p>
              </Reveal>
              <Reveal className="step d2">
                <span className="tee">02 &mdash; Approach</span>
                <h3>We build</h3>
                <p>
                  Your ball is cut, trued, and cased by hand over{" "}
                  {BUILD_TIME_WEEKS} weeks, with a photo of the finished
                  watch before it ships.
                </p>
              </Reveal>
              <Reveal className="step d3">
                <span className="tee">03 &mdash; Holed out</span>
                <h3>It ships</h3>
                <p>
                  Tracked and insured, free anywhere in the US. About two
                  weeks from order to wrist.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="section">
          <div className="wrap">
            <Reveal className="guarantee">
              <div className="guarantee-mark">&infin;</div>
              <div>
                <h2>Guaranteed for life.</h2>
                <p className="lede">
                  Every Dimple Dial carries a lifetime craftsmanship
                  guarantee. If the build or the movement ever lets you down
                  under normal wear, send it back and we&apos;ll repair or
                  rebuild it. A watch built by hand should be a sure thing,
                  not a gamble.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section className="section tight">
          <div className="wrap-narrow">
            <Reveal className="center">
              <span className="eyebrow center">Questions</span>
              <h2>The short answers.</h2>
            </Reveal>
            <div style={{ marginTop: "32px" }}>
              <details className="faq-item">
                <summary>Why does it take a week to build?</summary>
                <p>
                  Each watch is built by hand when you order it. Cutting and
                  seating a real golf ball into a watch case is slow, careful
                  work. A week is what it takes to do it right. With
                  shipping, plan on about two weeks from order to wrist.
                </p>
              </details>
              <details className="faq-item">
                <summary>Is the dial really a golf ball?</summary>
                <p>
                  Yes. A genuine ball, sliced and set under the crystal. The
                  dimples you see are the real surface of the ball, which is
                  why every dial pattern is one of one.
                </p>
              </details>
              <details className="faq-item">
                <summary>Does it need a battery?</summary>
                <p>
                  No. The NH34 is a jeweled automatic movement. It winds
                  itself from the motion of your wrist, so the second hand
                  sweeps instead of ticking and there&apos;s never a battery
                  to replace.
                </p>
              </details>
              <details className="faq-item">
                <summary>Can I use my own golf ball?</summary>
                <p>
                  Yes, and it&apos;s our favorite kind of build. Choose the
                  custom option when you order and we&apos;ll email you a
                  prepaid shipping label for your ball. Hole-in-one balls,
                  tournament balls, sentimental ones, they all work. Your
                  build starts the day your ball arrives.
                </p>
              </details>
              <details className="faq-item">
                <summary>What does the lifetime guarantee cover?</summary>
                <p>
                  The craftsmanship and the movement, for as long as you own
                  the watch. If the build or the automatic movement fails
                  under normal wear, we repair or rebuild it. It doesn&apos;t
                  cover loss, theft, or damage from impacts or water, the
                  same as any hand-built watch.
                </p>
              </details>
              <details className="faq-item">
                <summary>What if it doesn&apos;t fit?</summary>
                <p>
                  The bracelet is adjustable and fits most wrists. If
                  something isn&apos;t right when it arrives, reach out and
                  we&apos;ll make it right.
                </p>
              </details>
              <details className="faq-item">
                <summary>Can I wear it while playing?</summary>
                <p>
                  It&apos;s built for the clubhouse and the fairway! 
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final wrap" id="buy">
          <Reveal>
            <span className="eyebrow center">Limited by our own two hands</span>
            <h2>Your ball is waiting on the bench.</h2>
            <p className="lede" style={{ margin: "0 auto" }}>
              <span className="price-inline">${PRICE}</span> &bull; free US
              shipping &bull; about 3 weeks to your wrist
            </p>
            <BuyButton label={`Order the Dimple Dial`} />
          </Reveal>
        </section>
      </main>

      <StickyBar />

      <footer>
        <div className="wrap">
          <span>
            &copy; {new Date().getFullYear()} Links Time Co. All rights
            reserved.
          </span>
          <span>
            Questions?{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </span>
          <span>
            Links Time Co. is an independent brand. We are not affiliated
            with, sponsored by, or endorsed by any golf ball manufacturer.
            Dials are hand-crafted from authentic golf balls.
          </span>
        </div>
      </footer>
    </>
  );
}

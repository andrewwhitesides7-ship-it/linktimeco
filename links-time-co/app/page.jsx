import GolferScene from "./components/GolferScene";
import Reveal from "./components/Reveal";
import BuyButton from "./components/BuyButton";
import { BUILD_TIME_WEEKS, CONTACT_EMAIL, PRICE } from "../lib/config";

export default function Home() {
  return (
    <>
      <GolferScene />

      <nav className="nav">
        <a className="nav-mark" href="#top">
          Links Time Co<span>.</span>
        </a>
        <a className="nav-cta" href="#buy">
          Order
        </a>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero wrap">
          <div>
            <p className="eyebrow">Hand-built &bull; One at a time</p>
            <h1>
              A real golf ball,
              <br />
              <em>reborn as a dial.</em>
            </h1>
            <p className="hero-sub">
              The Dimple Dial is built by hand from a genuine tour golf ball,
              set in polished stainless steel. No two dials share the same
              dimple pattern. Yours is built when you order it.
            </p>
            <div className="price-row">
              <span className="price">{`$${PRICE}`}</span>
              <span className="price-note">
                {BUILD_TIME_WEEKS} week build &bull; ~3 weeks to your wrist &bull; Free US shipping
              </span>
            </div>
            <BuyButton />
          </div>
          <div className="hero-img">
            <img
              src="/images/hero.jpg"
              alt="The Dimple Dial watch with a genuine golf ball dial and red second hand"
            />
            <div className="hero-badge">Made to order</div>
          </div>
        </section>

        {/* STORY */}
        <section className="section">
          <div className="wrap story-grid">
            <Reveal>
              <p className="eyebrow">The dial</p>
              <h2>Cut from the ball. Set in steel.</h2>
              <p className="lede">
                Every dial starts as a real golf ball. We slice it, true it,
                and seat it inside a polished stainless case, dimples intact,
                script intact, the red numeral riding just below center. The
                red second hand sweeps over it like a tee peg in flight.
              </p>
              <p className="lede" style={{ marginTop: "16px" }}>
                It reads as a clean silver watch from across the room. Up
                close, every golfer does a double take.
              </p>
            </Reveal>
            <Reveal>
              <img
                src="/images/detail-1.jpg"
                alt="Close-up of the golf ball dial showing the dimple texture"
              />
            </Reveal>
          </div>
        </section>

        {/* GALLERY */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">In the metal</p>
              <h2>Every angle earns a look.</h2>
            </Reveal>
            <div className="gallery">
              <Reveal>
                <img src="/images/detail-2.jpg" alt="Angled view of the polished stainless steel case" />
              </Reveal>
              <Reveal>
                <img src="/images/detail-3.jpg" alt="Side profile showing the case and crown" />
              </Reveal>
              <Reveal>
                <img src="/images/wrist.jpg" alt="The Dimple Dial worn on the wrist" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* SPECS */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Specifications</p>
              <h2>Simple where it counts.</h2>
            </Reveal>
            <dl className="specs">
              <div className="spec">
                <dt>Dial</dt>
                <dd>Genuine golf ball</dd>
              </div>
              <div className="spec">
                <dt>Case</dt>
                <dd>Polished stainless steel</dd>
              </div>
              <div className="spec">
                <dt>Bracelet</dt>
                <dd>Stainless oyster-style</dd>
              </div>
              <div className="spec">
                <dt>Movement</dt>
                <dd>NH34 jeweled automatic</dd>
              </div>
              <div className="spec">
                <dt>Second hand</dt>
                <dd>Signature red</dd>
              </div>
              <div className="spec">
                <dt>Build time</dt>
                <dd>{BUILD_TIME_WEEKS} weeks, by hand</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* PROCESS */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2>Ordered today. On the bench tomorrow.</h2>
              <p className="lede">
                We don&apos;t sell from a warehouse shelf. Your order starts a
                build. That&apos;s why no two Dimple Dials are alike, and why
                yours is worth a short wait.
              </p>
            </Reveal>
            <div className="steps">
              <Reveal className="step">
                <span className="tee">Tee shot</span>
                <h3>You order</h3>
                <p>
                  Checkout takes a minute. You get a confirmation with your
                  build date the same day.
                </p>
              </Reveal>
              <Reveal className="step">
                <span className="tee">Approach</span>
                <h3>We build</h3>
                <p>
                  Your ball is cut, trued, and cased by hand over{" "}
                  {BUILD_TIME_WEEKS} weeks. We send a photo of your watch
                  before it ships.
                </p>
              </Reveal>
              <Reveal className="step">
                <span className="tee">Holed out</span>
                <h3>It ships</h3>
                <p>
                  Tracked and insured, free anywhere in the US. On your wrist
                  for your next round.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2>The short answers.</h2>
            </Reveal>
            <div style={{ marginTop: "28px" }}>
              <details className="faq-item">
                <summary>Why does it take two weeks?</summary>
                <p>
                  Each watch is built by hand when you order it. Cutting and
                  seating a real golf ball into a watch case is slow, careful
                  work. Two weeks is what it takes to do it right. With shipping,
                  plan on about three weeks from order to wrist.
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
                <summary>What if it doesn&apos;t fit or I change my mind?</summary>
                <p>
                  The bracelet is adjustable and fits most wrists. If
                  something isn&apos;t right, reach out within 14 days of
                  delivery and we&apos;ll make it right.
                </p>
              </details>
              <details className="faq-item">
                <summary>Can I wear it while playing?</summary>
                <p>
                  It&apos;s built for the clubhouse more than the fairway. It
                  handles daily wear fine, but we&apos;d take it off before
                  you swing, the same as any steel bracelet watch.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final wrap" id="buy">
          <Reveal>
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              Limited by our own two hands
            </p>
            <h2>Your ball is waiting on the bench.</h2>
            <BuyButton label={`Order the Dimple Dial \u2022 $${PRICE}`} />
          </Reveal>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>
            &copy; {new Date().getFullYear()} Links Time Co. All rights
            reserved.
          </span>
          <span>
            Questions? <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "inherit" }}>{CONTACT_EMAIL}</a>
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

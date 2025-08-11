import React from "react";
import carData from "./carData";

const TestDriveCard = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.imageSection}>
          <img src={carData.image} alt={carData.name} style={styles.image} />
        </div>
        <div style={styles.contentSection}>
          <h2>Schedule a Test Drive</h2>
          <p>{carData.description}</p>
          <a href="#" style={styles.ctaLink}>
            {carData.cta} →
          </a>
        </div>
      </div>
      <div style={styles.container1}>
        <p>
          * Prices indicated are Ex-showroom prices. Prices are subject to
          change without prior information at the discretion of Tata Motors.
          Contact your nearest Tata Motors dealer for exact prices.
        </p>
      </div>
      <div style={styles.container2}>
        <div style={styles.title}>CAUTION NOTICE</div>

        <p style={styles.paragraph}>
          Tata Motors Limited (TML) is India's largest manufacturer of trucks
          and buses, with a global presence. TML is one of the pioneers of
          eco-friendly mobility in India and continues to set new paradigms of
          safety and performance of cargo and public transport in India. As part
          of the Tata group of companies, TML also has rights of usage to
          numerous TATA trademarks, including but not limited to the well-known
          trademarks TATA, TATA MOTORS & corporate logo of the brand.
        </p>

        <p style={styles.paragraph}>
          Members of the public, trade and media are hereby informed that a
          website with URL &lt;www.tataevdealership.com&gt; has been found on
          the internet, which is allegedly offering dealerships under the name
          of TATA EV with an investment of INR 1.5 crores to INR 2.5 crores. TML
          has got no association, connection, reference or affiliation with the
          website and all of its contents therein, including but not limited to
          their impugned logo. TML does not associate with any of the products /
          services being sold or marketed via the foregoing website, including
          the entity owning the website and all resultant claims and businesses
          arising out of it. TML is actively seeking appropriate legal recourse
          against the URL and, in the meanwhile, disclaims any liabilities or
          claims that may arise out of such incorrect association and requests
          all stakeholders to not associate TML with the foregoing website, its
          offerings and claims.
        </p>

        <p style={styles.paragraph}>
          All stakeholders are urged to be vigilant so as not to become
          inadvertently a party to such acts of infringement and to bring any
          such acts to our attention. Should business be still conducted or
          information provided to such unscrupulous websites / entities, TML
          shall not be responsible or be held liable for any prejudice caused
          due to such businesses being conducted.
        </p>

        <p style={styles.paragraph}>
          Should anyone come across any such illegal activities, please write to
          us at our Email ID{" "}
          <span style={styles.email}>cac@tatamotors.com</span>
        </p>

        <p style={styles.paragraph}>
          Tata Motors Passenger Vehicle Limited (TMPV), part of Tata Motors
          Group is India's leading home-grown player and the third largest car
          manufacturer in India’s growing passenger vehicle sector. TMPV with
          winning products prioritises service excellence and customer
          satisfaction. As part of the Tata group of companies, TMPV also has
          rights of usage to numerous TATA trademarks, including but not limited
          to the well-known trademarks TATA, TATA MOTORS & corporate logo of the
          brand.
        </p>

        <p style={styles.paragraph}>
          Members of the public, trade and media are hereby informed that a
          website with URL &lt;www.tataevdealership.com&gt; has been found on
          the internet, which is allegedly offering dealerships under the name
          of TATA EV with an investment of INR 1.5 crores to INR 2.5 crores.
          TMPV has got no association, connection, reference or affiliation with
          the website and all of its contents therein, including but not limited
          to their impugned logo. TMPV does not associate with any of the
          products / services being sold or marketed via the foregoing website,
          including the entity owning the website and all resultant claims and
          businesses arising out of it. TMPV is actively seeking appropriate
          legal recourse against the URL and, in the meanwhile, disclaims any
          liabilities or claims that may arise out of such incorrect association
          and requests all stakeholders to not associate TMPV with the foregoing
          website, its offerings and claims.
        </p>

        <p style={styles.paragraph}>
          All stakeholders are urged to be vigilant so as not to become
          inadvertently a party to such acts of infringement and to bring any
          such acts to our attention. Should business be still conducted or
          information provided to such unscrupulous websites / entities, TMPV
          shall not be responsible or be held liable for any prejudice caused
          due to such businesses being conducted.
        </p>

        <p style={styles.paragraph}>
          Should anyone come across any such illegal activities, please write to
          us at our Email ID{" "}
          <span style={styles.email}>customercare@tatamotors.com</span>
        </p>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    padding: "20px 30px",
    borderRadius: "12px",
    justifyContent: "space-between",
    gap: "20px",
    marginLeft: "20px",
    maxWidth: "1250px",
    margin: "0 auto",
  },

  imageSection: {
    flex: 1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
  },
  contentSection: {
    flex: 1,
    padding: "20px",
  },
  ctaLink: {
    marginTop: "20px",
    display: "inline-block",
    color: "#0066ff",
    fontWeight: "bold",
    textDecoration: "none",
  },
  container1: {
    padding: "30px 40px",
    // border: "1px solid #ffeeba",
    // borderRadius: "10px",
    // fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    // lineHeight: "1.6",
    maxWidth: "1250px",
    margin: "30px auto",
    // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  container2: {
    // backgroundColor: "#fff3cd",
    // color: "#856404",
    padding: "20px 40px",
    border: "1px solid #ffeeba",
    borderRadius: "10px",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    lineHeight: "1.6",
    maxWidth: "1400px",
    margin: "20px auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "20px",
    textTransform: "uppercase",
    textAlign: "center",
  },
  paragraph: {
    marginBottom: "16px",
  },
  email: {
    color: "#0056b3",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

export default TestDriveCard;

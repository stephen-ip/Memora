import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";

function signup() {
  const router = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState(false);

  function updateUser(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function signUpUser(e) {
    e.preventDefault();
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        }
        if (!(json.error && json.error === "Passwords do not match")) {
          setUser({
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
          });
        }
        console.log("response: ", json);
        if (!json.error) {
          router.push("/login");
        }
      });
  }

  return (
    <div className="login">
      <Form className="form-login" onSubmit={(e) => signUpUser(e)}>
        <h1 className="form-login__header">Register</h1>
        <div className="field-group">
          <Form.Group className="mb-3" controlId="formBasicNameFirst">
            <Form.Label className="form-login__label">First Name</Form.Label>
            <Form.Control
              className="form-login__field"
              type="text"
              placeholder="Enter first name"
              name="firstname"
              value={user.firstname}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNameLast">
            <Form.Label className="form-login__label">Last Name</Form.Label>
            <Form.Control
              className="form-login__field"
              type="text"
              placeholder="Enter last name"
              name="lastname"
              value={user.lastname}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form-login__label">Email address</Form.Label>
          <Form.Control
            className="form-login__field"
            type="email"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={(e) => updateUser(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="form-login__label">Username</Form.Label>
          <Form.Control
            className="form-login__field"
            type="text"
            placeholder="Create username"
            name="username"
            value={user.username}
            onChange={(e) => updateUser(e)}
          />
        </Form.Group>

        <div className="field-group">
          <Form.Group className="mb-3" controlId="formBasicNameFirst">
            <Form.Label className="form-login__label">Mobile Number</Form.Label>
            <Form.Control
              className="form-login__field"
              type="tel"
              placeholder="Enter mobile number"
              name="phonenumber"
              value={user.phone}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNameFirst">
            <Form.Label className="form-login__label">Daily Reminder</Form.Label>
            <Form.Check

              type="checkbox"
              name="reminder"
              value={user.sms}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>
        </div>

        <div className="field-group">
          <Form.Group className="mb-3" controlId="formBasicNameFirst">
            <Form.Label className="form-login__label">Age</Form.Label>
            <Form.Control
              className="form-login__field"
              type="number"
              placeholder="Enter your age"
              name="age"
              value={user.age}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNameFirst">
            <Form.Label className="form-login__label">Country</Form.Label>
            <Form.Select
              className="form-select"
              name="country"
              value={user.countrycode}
              onChange={(e) => updateUser(e)}
            >
              <option>select country</option>
              <option value="AF">Afghanistan</option>
              <option value="AX">Aland Islands</option>
              <option value="AL">Albania</option>
              <option value="DZ">Algeria</option>
              <option value="AS">American Samoa</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AI">Anguilla</option>
              <option value="AQ">Antarctica</option>
              <option value="AG">Antigua and Barbuda</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armenia</option>
              <option value="AW">Aruba</option>
              <option value="AU">Australia</option>
              <option value="AT">Austria</option>
              <option value="AZ">Azerbaijan</option>
              <option value="BS">Bahamas</option>
              <option value="BH">Bahrain</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BY">Belarus</option>
              <option value="BE">Belgium</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BM">Bermuda</option>
              <option value="BT">Bhutan</option>
              <option value="BO">Bolivia</option>
              <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
              <option value="BA">Bosnia and Herzegovina</option>
              <option value="BW">Botswana</option>
              <option value="BV">Bouvet Island</option>
              <option value="BR">Brazil</option>
              <option value="IO">British Indian Ocean Territory</option>
              <option value="BN">Brunei Darussalam</option>
              <option value="BG">Bulgaria</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="KH">Cambodia</option>
              <option value="CM">Cameroon</option>
              <option value="CA">Canada</option>
              <option value="CV">Cape Verde</option>
              <option value="KY">Cayman Islands</option>
              <option value="CF">Central African Republic</option>
              <option value="TD">Chad</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CX">Christmas Island</option>
              <option value="CC">Cocos (Keeling) Islands</option>
              <option value="CO">Colombia</option>
              <option value="KM">Comoros</option>
              <option value="CG">Congo</option>
              <option value="CD">Congo, Democratic Republic of the Congo</option>
              <option value="CK">Cook Islands</option>
              <option value="CR">Costa Rica</option>
              <option value="CI">Cote DIvoire</option>
              <option value="HR">Croatia</option>
              <option value="CU">Cuba</option>
              <option value="CW">Curacao</option>
              <option value="CY">Cyprus</option>
              <option value="CZ">Czech Republic</option>
              <option value="DK">Denmark</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="DO">Dominican Republic</option>
              <option value="EC">Ecuador</option>
              <option value="EG">Egypt</option>
              <option value="SV">El Salvador</option>
              <option value="GQ">Equatorial Guinea</option>
              <option value="ER">Eritrea</option>
              <option value="EE">Estonia</option>
              <option value="ET">Ethiopia</option>
              <option value="FK">Falkland Islands (Malvinas)</option>
              <option value="FO">Faroe Islands</option>
              <option value="FJ">Fiji</option>
              <option value="FI">Finland</option>
              <option value="FR">France</option>
              <option value="GF">French Guiana</option>
              <option value="PF">French Polynesia</option>
              <option value="TF">French Southern Territories</option>
              <option value="GA">Gabon</option>
              <option value="GM">Gambia</option>
              <option value="GE">Georgia</option>
              <option value="DE">Germany</option>
              <option value="GH">Ghana</option>
              <option value="GI">Gibraltar</option>
              <option value="GR">Greece</option>
              <option value="GL">Greenland</option>
              <option value="GD">Grenada</option>
              <option value="GP">Guadeloupe</option>
              <option value="GU">Guam</option>
              <option value="GT">Guatemala</option>
              <option value="GG">Guernsey</option>
              <option value="GN">Guinea</option>
              <option value="GW">Guinea-Bissau</option>
              <option value="GY">Guyana</option>
              <option value="HT">Haiti</option>
              <option value="HM">Heard Island and Mcdonald Islands</option>
              <option value="VA">Holy See (Vatican City State)</option>
              <option value="HN">Honduras</option>
              <option value="HK">Hong Kong</option>
              <option value="HU">Hungary</option>
              <option value="IS">Iceland</option>
              <option value="IN">India</option>
              <option value="ID">Indonesia</option>
              <option value="IR">Iran, Islamic Republic of</option>
              <option value="IQ">Iraq</option>
              <option value="IE">Ireland</option>
              <option value="IM">Isle of Man</option>
              <option value="IL">Israel</option>
              <option value="IT">Italy</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japan</option>
              <option value="JE">Jersey</option>
              <option value="JO">Jordan</option>
              <option value="KZ">Kazakhstan</option>
              <option value="KE">Kenya</option>
              <option value="KI">Kiribati</option>
              <option value="KP">Korea, Democratic Peoples Republic of</option>
              <option value="KR">Korea, Republic of</option>
              <option value="XK">Kosovo</option>
              <option value="KW">Kuwait</option>
              <option value="KG">Kyrgyzstan</option>
              <option value="LA">Lao Peoples Democratic Republic</option>
              <option value="LV">Latvia</option>
              <option value="LB">Lebanon</option>
              <option value="LS">Lesotho</option>
              <option value="LR">Liberia</option>
              <option value="LY">Libyan Arab Jamahiriya</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lithuania</option>
              <option value="LU">Luxembourg</option>
              <option value="MO">Macao</option>
              <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
              <option value="MG">Madagascar</option>
              <option value="MW">Malawi</option>
              <option value="MY">Malaysia</option>
              <option value="MV">Maldives</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MH">Marshall Islands</option>
              <option value="MQ">Martinique</option>
              <option value="MR">Mauritania</option>
              <option value="MU">Mauritius</option>
              <option value="YT">Mayotte</option>
              <option value="MX">Mexico</option>
              <option value="FM">Micronesia, Federated States of</option>
              <option value="MD">Moldova, Republic of</option>
              <option value="MC">Monaco</option>
              <option value="MN">Mongolia</option>
              <option value="ME">Montenegro</option>
              <option value="MS">Montserrat</option>
              <option value="MA">Morocco</option>
              <option value="MZ">Mozambique</option>
              <option value="MM">Myanmar</option>
              <option value="NA">Namibia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NL">Netherlands</option>
              <option value="AN">Netherlands Antilles</option>
              <option value="NC">New Caledonia</option>
              <option value="NZ">New Zealand</option>
              <option value="NI">Nicaragua</option>
              <option value="NE">Niger</option>
              <option value="NG">Nigeria</option>
              <option value="NU">Niue</option>
              <option value="NF">Norfolk Island</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="NO">Norway</option>
              <option value="OM">Oman</option>
              <option value="PK">Pakistan</option>
              <option value="PW">Palau</option>
              <option value="PS">Palestinian Territory, Occupied</option>
              <option value="PA">Panama</option>
              <option value="PG">Papua New Guinea</option>
              <option value="PY">Paraguay</option>
              <option value="PE">Peru</option>
              <option value="PH">Philippines</option>
              <option value="PN">Pitcairn</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="PR">Puerto Rico</option>
              <option value="QA">Qatar</option>
              <option value="RE">Reunion</option>
              <option value="RO">Romania</option>
              <option value="RU">Russian Federation</option>
              <option value="RW">Rwanda</option>
              <option value="BL">Saint Barthelemy</option>
              <option value="SH">Saint Helena</option>
              <option value="KN">Saint Kitts and Nevis</option>
              <option value="LC">Saint Lucia</option>
              <option value="MF">Saint Martin</option>
              <option value="PM">Saint Pierre and Miquelon</option>
              <option value="VC">Saint Vincent and the Grenadines</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="ST">Sao Tome and Principe</option>
              <option value="SA">Saudi Arabia</option>
              <option value="SN">Senegal</option>
              <option value="RS">Serbia</option>
              <option value="CS">Serbia and Montenegro</option>
              <option value="SC">Seychelles</option>
              <option value="SL">Sierra Leone</option>
              <option value="SG">Singapore</option>
              <option value="SX">Sint Maarten</option>
              <option value="SK">Slovakia</option>
              <option value="SI">Slovenia</option>
              <option value="SB">Solomon Islands</option>
              <option value="SO">Somalia</option>
              <option value="ZA">South Africa</option>
              <option value="GS">South Georgia and the South Sandwich Islands</option>
              <option value="SS">South Sudan</option>
              <option value="ES">Spain</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudan</option>
              <option value="SR">Suriname</option>
              <option value="SJ">Svalbard and Jan Mayen</option>
              <option value="SZ">Swaziland</option>
              <option value="SE">Sweden</option>
              <option value="CH">Switzerland</option>
              <option value="SY">Syrian Arab Republic</option>
              <option value="TW">Taiwan, Province of China</option>
              <option value="TJ">Tajikistan</option>
              <option value="TZ">Tanzania, United Republic of</option>
              <option value="TH">Thailand</option>
              <option value="TL">Timor-Leste</option>
              <option value="TG">Togo</option>
              <option value="TK">Tokelau</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad and Tobago</option>
              <option value="TN">Tunisia</option>
              <option value="TR">Turkey</option>
              <option value="TM">Turkmenistan</option>
              <option value="TC">Turks and Caicos Islands</option>
              <option value="TV">Tuvalu</option>
              <option value="UG">Uganda</option>
              <option value="UA">Ukraine</option>
              <option value="AE">United Arab Emirates</option>
              <option value="GB">United Kingdom</option>
              <option value="US">United States</option>
              <option value="UM">United States Minor Outlying Islands</option>
              <option value="UY">Uruguay</option>
              <option value="UZ">Uzbekistan</option>
              <option value="VU">Vanuatu</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Viet Nam</option>
              <option value="VG">Virgin Islands, British</option>
              <option value="VI">Virgin Islands, U.s.</option>
              <option value="WF">Wallis and Futuna</option>
              <option value="EH">Western Sahara</option>
              <option value="YE">Yemen</option>
              <option value="ZM">Zambia</option>
              <option value="ZW">Zimbabwe</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="field-group">
          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label className="form-login__label">Password</Form.Label>
            <Form.Control
              className="form-login__field"
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>



          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label className="form-login__label">
              Confirm Password
            </Form.Label>
            <Form.Control
              className="form-login__field"
              type="password"
              placeholder="Re-enter password"
              name="passwordConfirm"
              value={user.passwordConfirm}
              onChange={(e) => updateUser(e)}
            />
          </Form.Group>
        </div>
        {error ? <p className="form-error">{error}</p> : null}
        <Button className="mb-4 form-login__button" type="submit">
          Create Account
        </Button>

        <Link href="/login">
          <a className="form-login__link">Sign In Here ⟶</a>
        </Link>
      </Form>
    </div>
  );
}

export default signup;

export async function getServerSideProps(context) {
  const data = await fetch("https://memora-azt1wq38c-stephen-ip.vercel.app/api/auth/loggedin", {
    headers: {
      Cookie: `token=${context.req.cookies.token}`,
    },
  }).then(async (response) => {
    let datajson = await response.json();
    return datajson;
  });
  if (data.user) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  } else {
    return {
      props: {},
    };
  }
}

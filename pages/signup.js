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
  const data = await fetch("http://localhost:3000/api/auth/loggedin", {
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

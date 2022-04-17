import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";

function login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);

  function updateCredentials(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function logInUser(e) {
    e.preventDefault();
    await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
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
        setCredentials({
          username: "",
          password: "",
        });
        console.log("response: ", json);
        if (json.message && json.message == "success") {
          router.push("/dashboard");
        }
      });
  }
  return (
    <div className="login">
      <Form className="form-login" onSubmit={(e) => logInUser(e)}>
        <h1 className="form-login__header">Login</h1>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="form-login__label">Username</Form.Label>
          <Form.Control
            className="form-login__field"
            type="text"
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={(e) => updateCredentials(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label className="form-login__label">Password</Form.Label>
          <Form.Control
            className="form-login__field"
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={(e) => updateCredentials(e)}
          />
        </Form.Group>
        {error ? <p className="form-error">{error}</p> : null}
        <Button className="form-login__button" type="submit">
          Log In
        </Button>

        <Link href="/signup">
          <a className="form-login__link">Create Your Account ⟶</a>
        </Link>
      </Form>
    </div>
  );
}

export default login;

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
        destination: "/dashboard",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

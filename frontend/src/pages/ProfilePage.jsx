import React, { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Card, Container, Row, Col, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const {user} = useAuth();

  // get user profile details
  useEffect(() => {
    const getUserProfile = async () => {
      setIsloading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const res = await axios.get(BACKEND_URL+'/api/user/profile', config);
        console.log(res);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error('Error fetching user info!', error.message)
      } finally {
        setIsloading(false);
      }
    }

    if (user) {
      getUserProfile();
    }

  }, [user]);

  if (isLoading) return <p>Loading your details!</p>


  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔄 Call your update API here
    console.log("Updated User:", { id: user.id, name, email });

    const updateUserProfile = async () => {
      setIsloading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
        const data = {
          name,
          email
        }
        const res = await axios.put(BACKEND_URL+'/api/user/profile', data,config);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.error('Error fetching user info!', error.message)
      } finally {
        setIsloading(false);
      }
    }

    if (user) {
      updateUserProfile();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // Auto hide alert
    }

  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">👤 My Profile</h3>

              {success && (
                <Alert variant="success" className="text-center">
                  ✅ Profile updated successfully!
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
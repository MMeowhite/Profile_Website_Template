import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BlogCard from '../../widget/blogBlock';
import useConfig from "../../utils/useConfig";

const Blog = () => {
    const [blogItems, setBlogItems] = useState([]);

    const { configValue: blogItemsConfig, error, loading } = useConfig('pages.blog');

    useEffect(() => {
        if (blogItemsConfig) {
            setBlogItems(blogItemsConfig);
        }
    }, [blogItemsConfig]);

    if (error) {
        return <div>Blog errors: {error}</div>;
    }

    if (loading) {
        return <div>Blog pages loading...</div>;
    }

    return (
        <Container style={{ marginTop: '12rem' }}>
            <Row className="g-4">
                {blogItems.map((blogItem, index) => (
                    <Col md={12} lg={6} key={index} style={{marginBottom: '3rem'}}>
                        <BlogCard blogItem={blogItem} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Blog;
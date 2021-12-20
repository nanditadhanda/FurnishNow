import React from 'react'

import {Row, Col, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const TnCScreen = () => {
    return (
        <Container className="py-5">
            <h1>Terms and Conditions for Furnish Now</h1>
            <small>Last updated: <span className='text-success'>December 21, 2021</span></small>
            <Row className="my-4">
                <Col>
                    <h4 className="my-4">Introduction</h4>
                    
                    <p className="text-justify lh-3">These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Furnish Now accessible at <Link to="/">www.furnishnow.com</Link>.</p>

                    <p className="text-justify lh-3">These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. These Terms and Conditions have been generated with the help of the Terms And Conditiions Sample Generator.</p>

                    <p className="text-justify lh-3">Minors or people below 18 years old are not allowed to use this Website.</p>

                    <h4 className="my-4">Introduction</h4>

                    <p className="text-justify lh-3">Other than the content you own, under these Terms, Furnish Now and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>

                     <p className="text-justify lh-3">You are granted limited license only for purposes of viewing the material contained on this Website.</p>

                     <h4 className="my-4">Restrictions</h4>

                     <p className="text-justify lh-3">You are specifically restricted from all of the following:</p>

                    <ul className='mb-4'>
                        <li className="my-2 text-justify">publishing any Website material in any other media;</li>
                        <li className="my-2 text-justify">selling, sublicensing and/or otherwise commercializing any Website material;</li>
                        <li className="my-2 text-justify">publicly performing and/or showing any Website material;</li>
                        <li className="my-2 text-justify">using this Website in any way that is or may be damaging to this Website;</li>
                        <li className="my-2 text-justify">using this Website in any way that impacts user access to this Website;</li>
                        <li className="my-2 text-justify">using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
                        <li className="my-2 text-justify">engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
                        <li className="my-2 text-justify">using this Website to engage in any advertising or marketing.</li>
                    </ul>

                     <p className="text-justify lh-3">Certain areas of this Website are restricted from being access by you and Furnish Now may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>

                     <h4 className="my-4">Your Content</h4>

                     <p className="text-justify lh-3">In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant Furnish Now a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>

                     <p className="text-justify lh-3">Your Content must be your own and must not be invading any third-party’s rights. Furnish Now reserves the right to remove any of Your Content from this Website at any time without notice.</p>

                     <h4 className="my-4">Your Privacy</h4>
                     <p className="text-justify lh-3">Please read <Link to="/privacy">Privacy Policy</Link></p>

                     <h4 className="my-4">No warranties</h4>

                     <p className="text-justify lh-3">This Website is provided "as is," with all faults, and Furnish Now express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>

                     <h4 className="my-4">Limitation of liability</h4>
                     <p className="text-justify lh-3">In no event shall Furnish Now, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Furnish Now, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>

                     <h4 className="my-4">Indemnification</h4>
                     <p className="text-justify lh-3">You hereby indemnify to the fullest extent Furnish Now from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>

                      <h4 className="my-4">Severability</h4>
                     <p className="text-justify lh-3">If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>

                      <h4 className="my-4">Variation of Terms</h4>
                     <p className="text-justify lh-3">Furnish Now is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>

                     <h4 className="my-4">Assignment</h4>
                     <p className="text-justify lh-3">The Furnish Now is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>

                     <h4 className="my-4">Entire Agreement</h4>

                     <p className="text-justify lh-3">These Terms constitute the entire agreement between Furnish Now and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>

                     <h4 className="my-4">Governing Law &amp; Jurisdiction</h4>
                     <p className="text-justify lh-3">These Terms will be governed by and interpreted in accordance with the laws of the State of my, and you submit to the non-exclusive jurisdiction of the state and federal courts located in my for the resolution of any disputes.</p>


                </Col>
            </Row>
        </Container>
    )
}

export default TnCScreen

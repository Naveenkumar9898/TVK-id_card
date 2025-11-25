import React from 'react'
import "./Card.css"
const Card = (props) => {
    console.log(props)
    props = props.member;

    return (
        <>
            <div className="id-card" >


                <div className="header" >
                    <h1>தமிழக வெற்றிக் கழகம்</h1>
                    <p>பிறப்பொன்றும் எவ்வளவுயிர்க்கும்!</p>
                </div >

                <div className="content">


                    <div className="left-section">
                        <img src={props.photo} className="profile" alt="" />
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MSeP9-tHEBAiDsSyaqUdrCj6Nb3FrmCxOQ&s" className="qr" alt="" />
                        <p className="qr-text">UYR0975888</p>
                    </div>


                    <div className="details">
                        <h3 className="card-title">உறுப்பினர் அட்டை</h3>

                        {print && print.num !== "" ? (

                            <div className="card-details">
                                <p><b>பெயர்: {props.name}</b></p>
                                <p><b>பூத் எண்:{props.bno}</b></p>
                                <p><b>சட்டமன்றம்:{props.legislative}</b> </p>
                                <p><b>மாவட்டம்:{props.distric}</b> </p>
                                <p><b>மாநிலம்:Tamilnadu</b> </p>
                            </div>

                        ) : (
                            <h4>தகவல் இல்லை</h4>
                        )}
                    </div>



                    <div className="person-image">
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/245b7b231551781.688b2e683d21f.png" className="leader" alt="" />
                    </div>

                </div>

                <div className="footer">

                    <img src="https://img.freepik.com/premium-vector/signature_951413-443.jpg?semt=ais_incoming&w=740&q=80" className="sign" alt="" />
                    <p>தலைவர்</p>

                </div>
                <h4>275, சி ஷோர் டவுன், 8வது அவென்யூ, பனையூர், கிழக்கு கடற்கரைச் சாலை, சென்னை - 600119. </h4>

            </div>
            <button className="download" onClick={() => window.print()}>Print</button >


        </>



    )
}

export default Card

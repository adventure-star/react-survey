import React, { useState, useEffect } from 'react'
import WithHeaderLayout from '../../layouts/WithHeaderLayout';
import { Typography, Card, CardHeader, CardContent, LinearProgress } from '@material-ui/core';
import AlertDialog from '../../components/AlertDialog';
import { apiGetSurveyById } from '../../services/news';
import LinearRating from '../../components/LinearRating';

const Detail = (props) => {

    const [loading, setLoading] = useState(true);

    const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");

    const [detail, setDetail] = useState({});

    useEffect(() => {
        getSurveyById(props.match.params.id);
    }, []);

    const getSurveyById = id => {
        apiGetSurveyById(id)
            .then(res => {
                console.log("res-----", res);
                setDetail(res.survey_result_detail);
                setLoading(false);
            })
            .catch(function (error) {
                // Handle Errors here.
                setLoading(false);
                console.log('===== error: ', error);
                setError(error.message);
                setAlert(true);
                setLoading(false);
                // ...
            });
    }

    const getParticipantRate = data => {
        let number = Number(data) * 100;
        return number.toFixed(2);
    }

    const getAverageRating = data => {
        let rating = 0;
        let index = 0;
        data.forEach(item => {

            if (!!item.response_content) {
                rating += Number(item.response_content);
                index++;
            }

        });
        return (rating / index).toFixed(2);
    }

    const onClose = () => {
        setAlert(false);
    }

    return (
        <WithHeaderLayout title="Location Screen">
            {loading &&
                <LinearProgress color="secondary" />
            }
            <div className="p-8">
                <div className="mx-auto" style={{ maxWidth: "600px" }}>
                    <div className="w-full">
                        {!!detail.name &&
                            <>
                                <div className="w-full text-center">
                                    <Typography variant="h3" color="primary">
                                        {detail.name}
                                    </Typography>
                                    <Typography variant="h4" color="inherit" className="py-6">
                                        Participation Rate
                            </Typography>
                                    <Typography variant="h5" color="primary">
                                        {getParticipantRate(detail.response_rate)}%
                            </Typography>
                                </div>
                                {detail.themes.map(item => (
                                    <Card key={item.name} className="mt-12">
                                        <div className="">
                                            <CardHeader
                                                title={item.name}
                                                titleTypographyProps={{ variant: 'h4' }}
                                                style={{ textAlign: "center" }}
                                            />
                                            <CardContent className="">
                                                <div className="w-full text-center">
                                                    <div >
                                                        <hr />
                                                        {item.questions.map(el => (
                                                            <div key={el.description} className="my-4">
                                                                <Typography variant="h6" color="primary">
                                                                    Question {el.survey_responses[0].question_id}
                                                                </Typography>
                                                                <Typography key={el.id} variant="h6" color="primary">
                                                                    Question Type: {el.question_type}
                                                                </Typography>
                                                                <div className="w-full flex-none sm:flex items-center">
                                                                    <div className="w-full flex sm:w-4/5">
                                                                        <p className="text-white bg-gray-500 rounded-lg text-lg text-left p-2">
                                                                            {el.description}
                                                                        </p>
                                                                    </div>
                                                                    <div className="w-full sm:w-1/5 my-6 flex sm:flxe-none">
                                                                        <LinearRating value={getAverageRating(el.survey_responses)} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                    </Card>
                                ))}
                            </>
                        }
                        <AlertDialog item="location" error={error} open={alert} handleClose={onClose} />
                    </div>
                </div>
            </div>
        </WithHeaderLayout >
    )
}

export default Detail;
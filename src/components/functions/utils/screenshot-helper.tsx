import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/format";
import { getImages, uploadImage } from "../../../store/actions/reports";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

export function Screenshots(props: {formik: any, updating: boolean}) {
    const {formik, updating} = props;
    const dispatch = useDispatch();

    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

    const handleImageClick = (url: string) => {

    }

    const handleFilesChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files);
        setFilesToUpload([ ...filesToUpload, ...files ]);
    };

    const removeImage = (index: number) => {
        const temp = filesToUpload.filter((_, i) => { return i !== index});
        setFilesToUpload(temp);
    }

    const uploadFiles = async () => {
        setLoading(true);
        let count = 0;
        filesToUpload.forEach((value) => {
            dispatch(uploadImage(orgToken, userToken, formik.values.id, value, (err) => {
                if (err) {
                    setError(err.message);
                    setHasError(true);
                }
                count++;
            }))
        })

        while (count < filesToUpload.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        setFilesToUpload([]);
        setLoading(false);
        handleFetchImages();
    }

    const handleFetchImages = () => {
        setLoading(true);
        dispatch(getImages(orgToken, userToken, formik.values.id, (err, images) => {
            if (err || !images) {
                setError(err.message);
                setHasError(true);
                setLoading(false);
            } else {
                setImages(images);
                setLoading(false);
            }
        }))
    }

    useEffect(() => {
        if (!images || images.length == 0) {
            handleFetchImages();
        }
    }, [formik, orgToken, userToken]);

    return(
        <div className="helper helper-image helper-image__wrapper">
            <div className="helper helper-image helper-image__upload-wrapper">
                <div className="helper helper-image helper-image__selected-wrapper">
                    <Button
                        variant="contained"
                        component="label"
                        className="helper helper-image helper-image__upload-button"
                        disabled={!updating}
                    >
                        Upload File
                        <FileUploadIcon />
                        <input
                            onChange={handleFilesChange}
                            multiple
                            type="file"
                            accept="image/*"
                            hidden
                        />
                    </Button>
                    <div className="helper helper-image helper-image__selected-item empty"></div>
                    { filesToUpload && filesToUpload.length > 0 ? (
                        <>
                            { filesToUpload.map((value: File, index: number) => (
                                    <div key={index} className="helper helper-image helper-image__selected-item">
                                        <p>{value.name}</p>
                                        <IconButton disabled={!updating} className="helper helper-image helper-image__selected-button" onClick={() => removeImage(index)}><CloseIcon /></IconButton>
                                    </div>
                                ))
                            }
                        </>
                    ) : null }
                </div>
                <Button disabled={!updating} className="helper helper-image helper-image__submit-button" variant="contained" onClick={uploadFiles}>Upload</Button>
            </div>
            <div className="helper helper-image helper-image__list-wrapper">
            { images.length > 0 ? ( images.map((value, index) => (
                <Button className="helper helper-image helper-image__image-button" key={index} onClick={() => handleImageClick(value)}>
                    <img className="helper helper-image helper-image__image" src={value} />
                </Button>
            ))) : null}
            </div>
            <Backdrop
                    open={loading}
                >
                    <CircularProgress />
            </Backdrop>
            <Dialog open={hasError} onClose={() => setHasError(false)}>
                <div id={'error-dialog'}>
                    <DialogTitle>There was a Error</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1">{error}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={() => setHasError(false)}>Close</Button>
                    </DialogActions>
                </div>
            </Dialog>
            { //TODO: Dialog to open up small image & Delete Image from report
            }
        </div>
    )
}
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../store/format";
import { deleteImage, getImages, updateImageDescription, uploadImage } from "../../../store/actions/reports";
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IVISORImage } from "../../../store/format/report.format";

export function Screenshots(props: {formik: any, updating: boolean}) {
    const {formik, updating} = props;
    const dispatch = useDispatch();

    const orgToken = useSelector((state: AppState) => state.authState.currentOrg.token);
    const userToken = useSelector((state: AppState) => state.authState.currentUser.token);

    const [images, setImages] = useState<IVISORImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState('');
    const [filesToUpload, setFilesToUpload] = useState<{file: File, description?: string}[]>([]);
    const [imageOpen, setImageOpen] = useState(false);
    const [image, setImage] = useState<IVISORImage>({} as IVISORImage);
    const [updateDescription, setUpdateDescription] = useState('');

    const handleImageClick = (image: IVISORImage) => {
        setImage(image);
        setUpdateDescription(image.description);
        setImageOpen(true);
    }

    const handleFilesChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files);
        const temp = [...filesToUpload];
        files.map((value) => {
            if (temp.filter((tempValue) => tempValue.file.name === value.name).length == 0) {
                temp.push({file: value, description: ''})
            }
        })
        setFilesToUpload(temp);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fileName: string) => {
        const temp = filesToUpload.map((value) => {
            if (value.file.name == fileName) {
                return {
                    file: value.file,
                    description: event.target.value
                }
            } else {
                return value;
            }
        })
        setFilesToUpload(temp);
    }

    const removeImage = (index: number) => {
        const temp = filesToUpload.filter((_, i) => { return i !== index});
        setFilesToUpload(temp);
    }

    const handleDeleteImage = () => {
        setLoading(true);
        dispatch(
            deleteImage(orgToken, userToken, image.name, (err) => {
                if (err) {
                    setError(err.message);
                    setHasError(true);
                }
                handleFetchImages();
            })
        )
        handleCloseImageDialog();
    }

    const handleUpdateImageDescription = () => {
        if (/^([a-z]|[A-Z]|[0-9]|@|\-|\s){1,256}$/.test(updateDescription)) {
            setLoading(true);
            dispatch(
                updateImageDescription(orgToken, userToken, image.name, updateDescription, (err) => {
                    if (err) {
                        setError(err.message);
                        setHasError(true);
                    }
                    setLoading(false);
                })
            )
            handleCloseImageDialog();
            handleFetchImages();
        } else {
            setError('Please do not use any Special Characters in the description of the Images! Also the maximum Length for a Description is: 256 Characters!');
            setLoading(false);
            setHasError(true);
        }
    }

    const handleCloseImageDialog = () => {
        setImageOpen(false);
        setImage({} as IVISORImage);
        setUpdateDescription('');
    }

    const uploadFiles = async () => {
        setLoading(true);
        let count = 0;
        let success = true;
        filesToUpload.forEach((value) => {
            if (/^([a-z]|[A-Z]|[0-9]|@|\-|\s){1,256}$/.test(value.description)) {
                dispatch(uploadImage(orgToken, userToken, formik.values.id, value.description, value.file, (err) => {
                    if (err) {
                        setError(err.message);
                        setHasError(true);
                    }
                    count++;
                }))
            } else {
                count = filesToUpload.length;
                success = false;
                setError('Please do not use any Special Characters in the description of the Images! Please make sure no description is empty and the maximum number of characters is 256!');
                setLoading(false);
                setHasError(true);
            }
        })

        while (count < filesToUpload.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (success) {
            setFilesToUpload([]);
            setLoading(false);
            handleFetchImages();
        }
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
                            { filesToUpload.map((value: {file: File, description: string}, index: number) => (
                                    <div key={index} className="helper helper-image helper-image__selected-item">
                                        <p>{value.file.name}</p>
                                        <IconButton disabled={!updating} className="helper helper-image helper-image__selected-button" onClick={() => removeImage(index)}><CloseIcon /></IconButton>
                                        <Tooltip title="Please do not enter any Special characters here. Special Characters do not work!">
                                            <TextField
                                                className="helper helper-image helper-image__selected-desc"
                                                variant="outlined"
                                                value={value.description}
                                                onChange={(event) => {handleDescriptionChange(event, value.file.name)}}
                                                label="Description"
                                            />
                                        </Tooltip>
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
                <div key={index} className="helper helper-image helper-image__image-wrapper">
                    <Button className="helper helper-image helper-image__image-button" onClick={() => handleImageClick(value)}>
                        <img className="helper helper-image helper-image__image" src={value.url} />
                    </Button>
                    <p className="helper helper-image helper-image__image-text">{value.description}</p>
                </div>
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
            <Dialog open={imageOpen} onClose={handleCloseImageDialog} id="image-dialog">
                <div className="helper helper-image helper-image__dialog-wrapper">
                    <DialogTitle>Updating Image: {image.name}</DialogTitle>
                    <DialogContent className="helper helper-image helper-image__dialog-content">
                        <img className="helper helper-image helper-image__dialog-image" src={image.url} />
                        <TextField 
                            variant="outlined"
                            value={updateDescription}
                            onChange={(event) => setUpdateDescription(event.target.value)}
                            className="helper helper-image helper-image__dialog-desc"
                            label="Description"
                            multiline
                            disabled={!updating}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={!updating} variant="contained" onClick={handleDeleteImage}>Delete</Button>
                        <Button disabled={!updating} variant="contained" onClick={handleUpdateImageDescription}>Update</Button>
                        <Button variant="contained" onClick={handleCloseImageDialog}>Close</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}
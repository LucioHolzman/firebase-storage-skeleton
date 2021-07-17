
const [images, setImages] = useState([]);

const [imageUp, setImageUp] = useState(null);

const [progress, setProgress] = useState(0);

const handleChangeImage = (e) => {
  if (e.target.files[0]) {
    setImageUp(e.target.files[0]);
  }
};

const handleUpload = () => {
  const uploadTask = storage.ref(`images/${imageUp.name}`).put(imageUp);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(progress);
      progress === 100 &&
        setInterval(() => {
          setProgress(0);
        }, 2500);
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const url = await storage
        .ref("images")
        .child(imageUp.name)
        .getDownloadURL();
      setImages([...images, url]);
    }
  );
};

const fetchStorageImages = () => {
  try {
    return storage.ref("images");
  } catch (error) {
    console.error(error);
  }
};

const allImages = useCallback(async () => {
  try {
    const { items } = await fetchStorageImages.listAll();
    const arrayImages = [];
    for (let item = 0; item < items.length; item++) {
      const element = items[item];
      const url = await element.getDownloadURL();
      arrayImages.push(url);
    }
    setImages(arrayImages);
  } catch (error) {
    console.error(error);
  }
}, []);

useEffect(() => {
  fetchAllImages();
}, []);

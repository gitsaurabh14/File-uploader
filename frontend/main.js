const progress = document.getElementById("progress");
const progressValue = document.getElementById("progress-value");

// Upload through file link
const fileURL = document.getElementById("file-url");
const uploadButton = document.getElementById("Upload-btn");
fileURL.oninput = () => {
  // change upload button style
  if (fileURL.value) {
    uploadButton.style.background = "#1b5fcc";
    uploadButton.style.color = "#fff";
  } else {
    uploadButton.style.background = "#fff";
    uploadButton.style.color = "#000";
  }
};
uploadButton.onclick = async () => {
  // download file and upload
  if (fileURL.value) {
    progress.style.width = "0%";
    progressValue.textContent = "0%";
    const response = await fetch(fileURL.value);
    const blob = await response.blob();
    uploader(blob);
  }
};
// Upload through file link end

// Upload through drag and drop
const dropArea = document.querySelector(".drop-area");
dropArea.addEventListener("dragover", (e) => e.preventDefault());
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
    progress.style.width = "0%";
    progressValue.textContent = "0%";
  // upload the file dropped
  uploader(e.dataTransfer.files[0]);
});
// Upload through drag and drop end

// Upload through select or browse files
const selectFileInput = document.getElementById("file-input");
selectFileInput.addEventListener("change", (e) => {
    progress.style.width = "0%";
    progressValue.textContent = "0%";
  uploader(e.target.files[0]);
});
// Upload through select or browse files end

// the uploader
const uploader = (file) => {
  try {
    if (file) {
      const getExtension = (type) => type.split("/").pop().toLowerCase();
      const formData = new FormData();
      if (file.type.startsWith("image/")) {
        formData.append("file", file, "image." + getExtension(file.type));
      } else {
        formData.append("file", file);
      }

      //    use XMLHttpRequest to track upload progress
      const xhr = new XMLHttpRequest();
      // upload progress
      xhr.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          progress.style.width = `${percentComplete}%`;
          progressValue.textContent = `${Math.round(percentComplete)}%`;
        }
      });

      // reset form on succussfull upload
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          document.querySelector("form").reset();
          setTimeout(() => {
            progressValue.innerHTML = "Uploaded successfully &#x1F63A;";
          },1200)
        }
      });

      xhr.open("POST", "http://localhost:7070/file-upload");
      xhr.send(formData);
    }
  } catch (error) {
    console.log(error);
  }
};

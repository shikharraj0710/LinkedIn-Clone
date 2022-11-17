import React, { forwardRef } from "react";
import { Avatar } from "@mui/material";
import InputOption from "./InputOption";
import "./Post.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import SetMealOutlinedIcon from "@mui/icons-material/SetMealOutlined"

const Post = forwardRef(({ name, description, message, photoURL }, ref) => {
  return (
    <div ref={ref} className="post">
      <div className="post__header">
        <Avatar src={photoURL}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>
      
      <div className="post__buttons">
         <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray"/>
         <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray"/>
         <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray"/>
         <InputOption Icon={SetMealOutlinedIcon} title="Send" color="gray"/>
      </div>
    </div>
  );
})

export default Post;

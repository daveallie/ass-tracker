import React from 'react'
import { Image, Label, Popup} from 'semantic-ui-react'
import styles from "./styles.module.css"

const Status = ({isOccupied, pic}) => {
  const img = (pic && pic.user) ? pic.user.photo : null;

  if (!pic || !pic.user) {
    return (
      <Label as='a' color={isOccupied ? "red" : "green"} image>
        {img && <img src={img} />}
        {isOccupied ? "Occupied" : "Available"}
      </Label>
    )
  }

  return (
    <Popup position="left center" trigger={
      <Label as='a' color={isOccupied ? "red" : "green"} image>
        <img src={img} />
        {isOccupied ? "Occupied" : "Available"}
      </Label>
    }>
      <div className={styles.popoverTitle}>Last User</div>
      <Image src={img} />
      <div className={styles.popoverContent}>
        <div className={styles.popoverRow}>
          <span className={styles.popoverKey}>Name:</span>
          <span className={styles.popoverValue}>{pic.user.name}</span>
        </div>
      </div>
      <div></div>
    </Popup>

  );
};

export default Status

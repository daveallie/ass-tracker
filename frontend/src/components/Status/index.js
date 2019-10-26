import React from 'react'
import { Label } from 'semantic-ui-react'

const Status = ({isOccupied, pic}) => {
const img = (pic && pic.user && pic.user.photo ) ? pic.user.photo : "https://react.semantic-ui.com/images/avatar/small/veronika.jpg"
return (
<div>
<Label as='a' color={isOccupied ? "green" : "red"} image>
      <img src={img} />
      Veronika
      <Label.Detail>Friend</Label.Detail> </Label>
</div>
)}

export default Status
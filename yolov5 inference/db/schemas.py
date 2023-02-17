from pydantic import BaseModel


class UserCreate(BaseModel):
    numOfPass: int
    numberPlate: str
    plateImg: str


class DriverCreate(BaseModel):
    username: str
    license_img: str
    expiry_date: str
    finger_id: int

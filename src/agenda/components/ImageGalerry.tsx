import { ImageList, ImageListItem } from '@mui/material';

export const ImageGalerry = ({ imgs }: Props) => {
  return (
    <ImageList sx={{ width: '100%', height: 250, justifyContent: 'center', alignItems: 'center', }} cols={3} rowHeight={164}>
      {
        (imgs.length === 0) &&
        itemData.map((item, index) => (
          <ImageListItem className='animate__animated animate__fadeIn' key={index}>
            <img
              src={item.img}
              srcSet={item.img}
              loading="lazy"
            />
          </ImageListItem>
        ))
      }
      {imgs.map((item, index) => (
        <ImageListItem className='animate__animated animate__fadeIn' key={index}>
          <img
            src={item}
            srcSet={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

interface Props {
  imgs: string[]
}

const itemData = [
  {
    img: 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png',
  },
  {
    img: 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png',
  },
  {
    img: 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png',
  },
  {
    img: 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png',
  },
  {
    img: 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png',
  },
  {
    img: 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image.png',
  },
];
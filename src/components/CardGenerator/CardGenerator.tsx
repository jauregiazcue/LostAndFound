import { useState, useEffect } from 'react'
import readXlsxFile from 'read-excel-file/browser';


import Card from '@components/Card/Card';
import List from '@components/List/List';
import Stack from '@components/Stack/Stack';
import Title, { TitleType } from '@components/Title/Title';
import type { Payload } from '@/interfaces/payload';
import type { CardPayload } from '@components/Card/Card';
import { LinkType, type LinkPayload } from '@components/Links/Link';

export interface MyCardPayload extends CardPayload {
  url?: string,
  url2?: string
}

const CardGenType = {
  grid: 0,
  list: 1,
}

type CardGenType = (typeof CardGenType)[keyof typeof CardGenType];
export { CardGenType };

interface CardGeneratorPayload extends Payload {
  csv: string,
  type: CardGenType,
  title: string,
  titleType?: TitleType
}

function CardGenerator(payload: CardGeneratorPayload) {
  const { id, type, title, titleType } = payload;
  const [objects, setObjects] = useState<MyCardPayload[]>([]);

  useEffect(() => {
    async function fetchExcel() {
      try {
        // Fetch the file from the public folder and convert to a File/Blob
        const response = await fetch(payload.csv);
        const blob = await response.blob();
        const rows = await (readXlsxFile)(blob);
        const card: MyCardPayload[] = [];
        rows.forEach((row) => {
          row.data.forEach((data, index) => {
            if (index == 0) return;
            card.push({ title: data[5], year: data[3], image: "/LostAndFound/placeholder.png" } as MyCardPayload);
          })

        });

        // Cast is needed because readXlsxFile returns Row[] without your schema type
        setObjects(card);

      } catch (err) {
        console.error('Failed to load Excel file:', err);
      }
    }

    fetchExcel();
  }, [payload.csv]);

  function setObject(object: MyCardPayload) {
    const { title, description, year, image, url, url2 } = object;
    const list: LinkPayload[] = [];
    if (url) {
      list.push({ href: url, target: "_blank", text: "Showcase" });
    }
    if (url2) {
      list.push({ href: url2, target: "_blank", text: "Repo" });
    }
    return { title, description, year, image, list };
  }

  if (type === CardGenType.grid) {
    return <>
      <Title id={id} title={title} type={titleType} />
      <Stack fullPage={false}>
        {objects.map((object: MyCardPayload, index: number) => {
          const { title, description, year, image, list } = setObject(object);
          return <Card key={index} title={title}
            year={year}
            image={image}
            links={{ list: list, type: LinkType.simple }}
            description={description} />
        })}
      </Stack>
    </>
  }

  const aux: CardPayload[] = objects.map((object: MyCardPayload) => setObject(object));

  return <>
    <Title id={id} title={title} type={titleType} />
    <Stack>
      <List list={aux} />
    </Stack>
  </>
}

export default CardGenerator;
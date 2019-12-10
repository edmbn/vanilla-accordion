## Usage

```
    const accordion = document.querySelector("vjs-accordion");
    const items = [
        {
        term: "Content 1 term",
        description:
            "Content 1 description"
        },
        {
        term: "Content 2 term",
        description:
            "Content 2 description"
        },
        {
        term: "Content 3 term",
        description:
            "Content 3 description"
        }
    ];
    accordion.items = items;
```

## Properties

| Property | Default |            Description             |
| :------: | :-----: | :--------------------------------: |
| `items`  |         | Items to be displayed in the list. |

## Customize CSS

|            Variable             |  Default  |
| :-----------------------------: | :-------: |
|         `--List-height`         |   300px   |
|       `--Term-background`       |  #2900d2  |
|       `--Term-textColor`        |   #fff    |
|       `--Term-fontWeight`       |    700    |
|      `--Term-borderRadius`      |   10px    |
|      `--Term-borderWidth`       | 0 0 1px 0 |
|      `--Term-borderColor`       |   #fff    |
|      `--Term-borderStyle`       |   solid   |
| `--Description-backgroundColor` |  #c0dfe8  |
|    `--Description-textColor`    |  #30302e  |
|    `--Description-textSize`     |   1rem    |

## Run project

### Development

```bash
npm run start
```

### Build

```bash
npm run build
```

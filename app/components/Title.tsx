export const Title = ({ title }: TitleProps) => {
  return <h1>{title}</h1>;
};

interface TitleProps {
  title: string;
}

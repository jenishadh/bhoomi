import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactElement;
}

export function CardWrapper({ title, description, children, footer }: CardWrapperProps) {
  return (
    <Card className="flex w-[350px] flex-col gap-8 md:w-[400px]">
      <CardHeader>
        <CardTitle className="font-mono text-2xl tracking-tight md:text-3xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="self-center">{footer}</CardFooter>}
    </Card>
  );
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          password_hash: string
          updated_at: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          password_hash: string
          updated_at?: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_settings: {
        Row: {
          created_at: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          location_iframe: string | null
          phone_icon_size: string | null
          phone_icon_style: string | null
          phone_icon_url: string | null
          phone_number: string | null
          phone_number_secondary: string | null
          updated_at: string
          whatsapp_icon_size: string | null
          whatsapp_icon_style: string | null
          whatsapp_icon_url: string | null
          whatsapp_number: string | null
        }
        Insert: {
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          location_iframe?: string | null
          phone_icon_size?: string | null
          phone_icon_style?: string | null
          phone_icon_url?: string | null
          phone_number?: string | null
          phone_number_secondary?: string | null
          updated_at?: string
          whatsapp_icon_size?: string | null
          whatsapp_icon_style?: string | null
          whatsapp_icon_url?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          created_at?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          location_iframe?: string | null
          phone_icon_size?: string | null
          phone_icon_style?: string | null
          phone_icon_url?: string | null
          phone_number?: string | null
          phone_number_secondary?: string | null
          updated_at?: string
          whatsapp_icon_size?: string | null
          whatsapp_icon_style?: string | null
          whatsapp_icon_url?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      email_settings: {
        Row: {
          created_at: string
          email_address: string
          email_password: string
          id: string
          is_active: boolean
          sender_name: string
          smtp_host: string
          smtp_port: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          email_address: string
          email_password: string
          id?: string
          is_active?: boolean
          sender_name?: string
          smtp_host: string
          smtp_port?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          email_address?: string
          email_password?: string
          id?: string
          is_active?: boolean
          sender_name?: string
          smtp_host?: string
          smtp_port?: number
          updated_at?: string
        }
        Relationships: []
      }
      feature_categories: {
        Row: {
          color: string
          created_at: string
          id: string
          name: string
          order_index: number
          updated_at: string
        }
        Insert: {
          color?: string
          created_at?: string
          id?: string
          name: string
          order_index?: number
          updated_at?: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: string
          name?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string | null
          id: string
          image_url: string
          is_active: boolean | null
          order_index: number | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      map_settings: {
        Row: {
          background_image: string | null
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          background_image?: string | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          background_image?: string | null
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      map_villas: {
        Row: {
          created_at: string
          id: string
          type: string
          updated_at: string
          x: number
          y: number
        }
        Insert: {
          created_at?: string
          id?: string
          type: string
          updated_at?: string
          x: number
          y: number
        }
        Update: {
          created_at?: string
          id?: string
          type?: string
          updated_at?: string
          x?: number
          y?: number
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string
          description: string | null
          file_size: number | null
          file_type: string | null
          height: number | null
          id: string
          is_active: boolean
          tags: string[] | null
          title: string | null
          updated_at: string
          url: string
          usage_count: number | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_type?: string | null
          height?: number | null
          id?: string
          is_active?: boolean
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          url: string
          usage_count?: number | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          file_size?: number | null
          file_type?: string | null
          height?: number | null
          id?: string
          is_active?: boolean
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          url?: string
          usage_count?: number | null
          width?: number | null
        }
        Relationships: []
      }
      property_icons: {
        Row: {
          category: string
          created_at: string
          display_name: string
          icon_name: string
          icon_svg: string
          id: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          display_name: string
          icon_name: string
          icon_svg: string
          id?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          display_name?: string
          icon_name?: string
          icon_svg?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      roads: {
        Row: {
          created_at: string
          end_pos: number
          id: string
          orientation: string
          position: number
          start_pos: number
          thickness: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_pos: number
          id?: string
          orientation: string
          position: number
          start_pos: number
          thickness: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_pos?: number
          id?: string
          orientation?: string
          position?: number
          start_pos?: number
          thickness?: number
          updated_at?: string
        }
        Relationships: []
      }
      room_types: {
        Row: {
          created_at: string
          default_icon_id: string | null
          display_name: string
          icon_category: string
          id: string
          is_active: boolean
          is_manual: boolean | null
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_icon_id?: string | null
          display_name: string
          icon_category?: string
          id?: string
          is_active?: boolean
          is_manual?: boolean | null
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_icon_id?: string | null
          display_name?: string
          icon_category?: string
          id?: string
          is_active?: boolean
          is_manual?: boolean | null
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_types_default_icon_id_fkey"
            columns: ["default_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
        ]
      }
      slider_images: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_active: boolean
          order_index: number
          page_type: string
          title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_active?: boolean
          order_index?: number
          page_type?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean
          order_index?: number
          page_type?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      villa_room_counts: {
        Row: {
          count: number
          created_at: string
          icon_id: string | null
          id: string
          room_type_id: string
          updated_at: string
          villa_id: string
        }
        Insert: {
          count?: number
          created_at?: string
          icon_id?: string | null
          id?: string
          room_type_id: string
          updated_at?: string
          villa_id: string
        }
        Update: {
          count?: number
          created_at?: string
          icon_id?: string | null
          id?: string
          room_type_id?: string
          updated_at?: string
          villa_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "villa_room_counts_icon_id_fkey"
            columns: ["icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_room_counts_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_room_counts_villa_id_fkey"
            columns: ["villa_id"]
            isOneToOne: false
            referencedRelation: "villas"
            referencedColumns: ["id"]
          },
        ]
      }
      villa_type_displays: {
        Row: {
          bathroom_icon_id: string | null
          bedroom_icon_id: string | null
          created_at: string
          display_bathrooms: number
          display_bedrooms: number
          display_features: string[]
          display_halls: number | null
          display_image: string
          display_living_rooms: number | null
          gallery_images: string[] | null
          hall_icon_id: string | null
          id: string
          living_room_icon_id: string | null
          updated_at: string
        }
        Insert: {
          bathroom_icon_id?: string | null
          bedroom_icon_id?: string | null
          created_at?: string
          display_bathrooms: number
          display_bedrooms: number
          display_features: string[]
          display_halls?: number | null
          display_image: string
          display_living_rooms?: number | null
          gallery_images?: string[] | null
          hall_icon_id?: string | null
          id: string
          living_room_icon_id?: string | null
          updated_at?: string
        }
        Update: {
          bathroom_icon_id?: string | null
          bedroom_icon_id?: string | null
          created_at?: string
          display_bathrooms?: number
          display_bedrooms?: number
          display_features?: string[]
          display_halls?: number | null
          display_image?: string
          display_living_rooms?: number | null
          gallery_images?: string[] | null
          hall_icon_id?: string | null
          id?: string
          living_room_icon_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_villa_type_displays_villa_type"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "villa_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_type_displays_bathroom_icon_id_fkey"
            columns: ["bathroom_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_type_displays_bedroom_icon_id_fkey"
            columns: ["bedroom_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_type_displays_hall_icon_id_fkey"
            columns: ["hall_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_type_displays_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "villa_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villa_type_displays_living_room_icon_id_fkey"
            columns: ["living_room_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
        ]
      }
      villa_types: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      villas: {
        Row: {
          bathroom_icon_id: string | null
          bathrooms: number | null
          bedroom_icon_id: string | null
          bedrooms: number | null
          coordinates: Json | null
          created_at: string
          description: string | null
          detail_gallery_images: string[]
          feature_groups: Json | null
          features: Json | null
          hall_icon_id: string | null
          halls: number | null
          id: string
          image_urls: string[] | null
          is_active: boolean
          living_room_icon_id: string | null
          living_rooms: number | null
          name: string
          price: number
          updated_at: string
          villa_details: string | null
          villa_type_id: string
        }
        Insert: {
          bathroom_icon_id?: string | null
          bathrooms?: number | null
          bedroom_icon_id?: string | null
          bedrooms?: number | null
          coordinates?: Json | null
          created_at?: string
          description?: string | null
          detail_gallery_images?: string[]
          feature_groups?: Json | null
          features?: Json | null
          hall_icon_id?: string | null
          halls?: number | null
          id?: string
          image_urls?: string[] | null
          is_active?: boolean
          living_room_icon_id?: string | null
          living_rooms?: number | null
          name: string
          price: number
          updated_at?: string
          villa_details?: string | null
          villa_type_id: string
        }
        Update: {
          bathroom_icon_id?: string | null
          bathrooms?: number | null
          bedroom_icon_id?: string | null
          bedrooms?: number | null
          coordinates?: Json | null
          created_at?: string
          description?: string | null
          detail_gallery_images?: string[]
          feature_groups?: Json | null
          features?: Json | null
          hall_icon_id?: string | null
          halls?: number | null
          id?: string
          image_urls?: string[] | null
          is_active?: boolean
          living_room_icon_id?: string | null
          living_rooms?: number | null
          name?: string
          price?: number
          updated_at?: string
          villa_details?: string | null
          villa_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_villas_villa_type"
            columns: ["villa_type_id"]
            isOneToOne: false
            referencedRelation: "villa_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_villas_villa_type_id"
            columns: ["villa_type_id"]
            isOneToOne: false
            referencedRelation: "villa_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villas_bathroom_icon_id_fkey"
            columns: ["bathroom_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villas_bedroom_icon_id_fkey"
            columns: ["bedroom_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villas_hall_icon_id_fkey"
            columns: ["hall_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villas_living_room_icon_id_fkey"
            columns: ["living_room_icon_id"]
            isOneToOne: false
            referencedRelation: "property_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "villas_villa_type_id_fkey"
            columns: ["villa_type_id"]
            isOneToOne: false
            referencedRelation: "villa_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin_user: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_authenticated: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
